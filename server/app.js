if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const cors = require('cors')
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const route = require("./routes");

app.use(cors())
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", route);

app.listen(port, () => {
  console.log(`server ${port}`);
});

module.exports = {
  app
}