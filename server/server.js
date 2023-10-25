const express = require("express");
const sequelize = require("./config");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/get/", require("./routes/GetRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
