var express=require("express");
var router=express.Router();
var allQueries=require("../model/allQueries")

//API to deposit money :
router.post('/deposit',function(req,res){
    console.log("req.body in deposit method..",req.body);
    var amount=parseInt(req.body.amt);
    var userid=parseInt(req.body.uid);
    var ob={uid:userid,amt:amount,status:req.body.status,date_time:new Date()}
    //Function to insert this transaction in 'accounts' table:
    allQueries.insert("accounts",ob).then(result1=>{
    //Function to update net balance in 'user' table:
        allQueries.update("user",{uid:userid},{net_bal:amount}).then(result2=>{
            if(result1 && result2){
                res.send({status:1,result:"successfully inserted and updated net balance",ob:ob})
            }
        })
        .catch(error=>{
            res.send({status:0,error:error,msg:"failed due to update query.."});
        })
    })
    .catch(err=>{
        res.send({status:0,error:err,msg:"failed due to insert query.."})
    })
})
//API to withraw money :
router.post('/withdraw',function(req,res){
    console.log("req.body in withdraw method..",req.body);
    var amount=parseInt(req.body.amt);
    var userid=parseInt(req.body.uid);
    var netBal=parseInt(req.body.net_bal);
    var ob={uid:userid,amt:amount,status:req.body.status,date_time:new Date()}
    //Checking if amount entered by the user does not exceed current balance in the account
    if(amount<=netBal){
         //Function to insert this transaction in 'accounts' table:
        allQueries.insert("accounts",ob).then(result1=>{
            //Function to update net balance in 'user' table:
            allQueries.modify("user",{uid:userid},{net_bal:amount}).then(result2=>{
                if(result1 && result2){
                    res.send({status:1,result:"successfully inserted and updated net balance"})
                }
            })
            .catch(error=>{
                res.send({status:0,error:error,msg:"failed due to update query.."});
            })
        })
        .catch(err=>{
            res.send({status:0,error:err,msg:"failed due to insert query.."})
        })
    }
    //Condition where amount entered by the user exceeds current net balance:
    else{
        res.send("Insufficient balance!")
        //req.flash('info','Insufficient balance');
        //res.redirect('back');
    }
    
})
module.exports=router;