var express=require("express");
var router=express.Router();
var token=require("../helper/token");
var jwt=require("jsonwebtoken");
var allQueries=require("../model/allQueries");

//API to view all transactions of a particular customer:
router.get('/transactions',function(req,res){
    var id=req.query.uid;
    console.log("mentioned id...",id);
    //Function to verify token so that no user can access this without logging in:
    jwt.verify(req.query.token,'supersecret',function(err1,data){
        if(err1){
            res.send("Authorization failed!!")
        }
        if(data){
          console.log("token data...",data);  
          //Function to fetch all transactions of particular customer from 'accounts' table of db:
    allQueries.getTransactions("accounts",{uid:id}).then(result=>{
        if(result.length==0){
            res.status(400).json({status:0,result:"No transactions available!"})
        }
        else{
        var pagedata={"title":"transactions","pagename":"transactions",transactions:result}
        res.render("layout",pagedata)
        }
    })
    .catch(error=>{
        res.status(400).json({status:0,error:error})
    })
}
})

})
module.exports=router;