const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require("./controllers/authController.js")(app);


app.get("/", (req, res) => {
    res.json({ok: true});
});

app.listen(3000, () => {
    console.log("app rondando!");
});