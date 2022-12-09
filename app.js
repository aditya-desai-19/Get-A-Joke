const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const say = require("say");
const app = express();
let joke = "";

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/", function(req, res){
    res.render("index",{jokeContent:joke});
});

app.post("/", function(req, res){
    const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

    https.get(url, function(response){
        response.on("data", function(data){
            const info = JSON.parse(data);
            joke = info.joke;
            res.redirect("/");
        })
    })
});

app.post("/speak",function(req,res){
    say.speak(joke);
    res.redirect("/");
});

app.listen(5000, function(){
    console.log("Server is running on port 3000");
});