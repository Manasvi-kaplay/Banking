var express=require("express");
var router=express.Router();
//API to get home page:
router.get('/',function(req,res){
    var pagedata={"title":"Home page","pagename":"home"};
    res.render("layout",pagedata);
})
module.exports=router;