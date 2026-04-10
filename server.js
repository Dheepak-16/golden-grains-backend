require("dotenv").config();
const app = require("./api/index");

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});