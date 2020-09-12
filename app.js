//This file is the entry point of the project.
//Project is run using this file

var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var session=require("express-session");
var cookieParser=require("cookie-parser");
var ejs=require("ejs");
var flash=require("express-flash")
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
  extended:false,
  limit:'50mb'
}));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(express.static(__dirname+"/public"));
app.use(cookieParser());
app.use(flash())
app.use(session({ secret : "TSS", saveUninitialized: true}));
app.use(require("./controller/default"));
app.listen(process.env.PORT || 1000,function(){
  //console.log(Math.floor(Math.random() * (99999 - 10000) + 10000))
    console.log("server started at port 1000")
});
