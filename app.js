var express = require("express");
var app = express();
app.use(express.static("./public"))
app.use(express.static("./views"))

var shouye = "index.html";
var houtai = "houtai.html";

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/" + shouye)
})
app.get("/houtai", function(req, res) {
    res.sendFile(__dirname + "/views/" + houtai)
})

app.listen(81, function() {
    console.log("81  ||||   启|||动|||完|||成")
})