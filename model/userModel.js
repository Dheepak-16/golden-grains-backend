const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userId: { type: Number, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, sparse: true },
    password: { type: String },

    googleId: { type: String, default: "" },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    resetOTP: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },

    addresses: [
        {
            house: String,
            area: String,
            city: String,
            pincode: String
        }
    ],

    orders: [
        {
            orderId: Number,
            date: String,
            deliveryDate: String,
            items: Array,
            total: Number
        }
    ],

    role: {
        type: String,
        default: "user"
    }

})
module.exports = mongoose.model("user", userSchema);