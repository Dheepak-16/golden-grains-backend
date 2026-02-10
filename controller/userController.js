const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const generateOtp = require('../utils/generateOtp');

exports.signUpUser = async (req, res) => {
    try {
        const { name, email, mobileNumber, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "Email already registered"
            });
        }

        const sameUser = await userModel.findOne({ mobileNumber });
        if (sameUser) {
            return res.status(400).send({
                success: false,
                message: "Mobile Number already registered"
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);


        const newUserId = await generateUserId()
        const newUser = new userModel({ userId: newUserId, name, email, mobileNumber, password: hashpassword });
        const result = await newUser.save()

        res.status(201).send({
            success: true,
            message: "signup successful"
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        })
    }
}
const generateUserId = async () => {
    const lastUser = await userModel
        .findOne()
        .sort({ userId: -1 })
        .select("userId");

    return lastUser ? lastUser.userId + 1 : 1;
};

exports.logInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const reqUser = await userModel.findOne({ email })
        if (!reqUser) {
            return res.status(400).send({
                success: false,
                message: 'user not found'
            })
        }
        const check = await bcrypt.compare(password, reqUser.password)
        if (!check) {
            return res.status(400).send({
                success: false,
                message: "Invalid password"
            });
        }

        // return res.status(200).send({
        //     success: true,
        //     message: 'Login Successful'
        // })   

        const userData = await userModel
            .findById(reqUser._id)
        // .select('-password')

        const token = jwt.sign({
            id: userData._id,
            // name: userData.name,
            email: userData.email,
            // password: userData.password
        },
            process.env.jwt_SECRET,
            {
                expiresIn: "7d"
            }
        )
        res.status(200).send({
            success: true,
            message: "Login Successful",
            token: token,
            user: {
                id: userData.userId,
                name: userData.name,
                email: userData.email,
                mobile: userData.mobileNumber
            }
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

exports.googleSingUp = async (req, res) => {
    try {
        const { name, email, googleId } = req.body;

        if (!email || !googleId) {
            return res.status(400).json({
                success: false,
                message: "Google data missing"
            });
        }

        let user = await userModel.findOne({ email });

        if (user) {
            const token = jwt.sign(
                { id: user.userId },
                process.env.jwt_SECRET,
                { expiresIn: "7d" }
            );

            return res.status(200).json({
                success: true,
                message: "Login Successful",
                token,
                user: {
                    userId: user.userId,
                    name: user.name,
                    email: user.email
                }
            });
        }

        const newUserId = await generateUserId();
        user = await userModel.create({
            userId: newUserId,
            name,
            email,
            googleId,
            authProvider: "google"
        });

        const token = jwt.sign(
            { id: newUserId },
            process.env.jwt_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(201).json({
            success: true,
            message: "Google Signup Successful",
            token,
            user: {
                userId: user.userId,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Google Signup Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Email is required"
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        const otp = generateOtp();

        user.resetOTP = otp.toString();
        user.otpExpiry = Date.now() + 5 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset OTP",
            html: `
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
  <table width="100%">
    <tr>
      <td align="center">
        <table style="background:#fff; padding:30px; border-radius:8px;">
          <tr>
            <td align="center">
              <h2 style="color:#2575fc;">Golden Grains</h2>
            </td>
          </tr>

          <tr>
            <td>
              <p>Hello,</p>
              <p>Please use the OTP below to reset your password:</p>

              <div style="
                text-align:center;
                font-size:28px;
                letter-spacing:6px;
                font-weight:bold;
                color:#2575fc;
                background:#f1f5ff;
                padding:15px;
                border-radius:6px;">
                ${otp}
              </div>

              <p>This OTP is valid for <strong>1 minute</strong>.</p>

              <p>Regards,<br/><strong>Golden Grains Team</strong></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        console.log("Incoming:", email, otp);

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP required"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("DB OTP:", user.resetOTP);

        // FIXED comparison
        if (user.resetOTP?.toString().trim() !== otp.toString().trim()) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired"
            });
        }

        user.resetOTP = null;
        user.otpExpiry = null;
        await user.save();

        res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Email and new password required"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};






