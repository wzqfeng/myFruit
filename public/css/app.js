var express = require("express");
var app = express();
app.use(express.static("./public"))
app.use(express.static("./views"))
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static("./public"));
app.use(express.static("./views"));
app.use(express.static("./"))
var houtai1 = require("./apps/houtai")

var shouye = "index.html";
var houtai = "houtai/houtai.html";
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/" + shouye)
})
app.get("/houtai", function(req, res) {
    res.sendFile(__dirname + "/views/" + houtai)
})

app.post("/addPost", urlencodedParser, houtai1.addPost)

app.get("/getData", houtai1.getData)

app.post("/delData", urlencodedParser, houtai1.delData)

app.post("/updData", urlencodedParser, houtai1.updData)

app.listen(81, function() {
    console.log("81  ||||   启|||动|||完|||成")
})