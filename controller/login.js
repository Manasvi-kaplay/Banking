var express=require("express");
var router=express.Router();
var allQueries=require("../model/allQueries");
var jwt=require("jsonwebtoken");
router.get('/banker',function(req,res){
    var pagedata={"title":"Home page","pagename":"home"}
                res.render("layout",pagedata)
})
router.get('/customer',function(req,res){
    var pagedata={"title":"Home page","pagename":"home"}
                res.render("layout",pagedata)
})
//API for banker login:
router.post('/banker',function(req,res){
    console.log("req.body of banker..",req.body);
    //Function to search on the basis of usertype and username:
    allQueries.findwhere("user",req.body).then(result1=>{
        allQueries.findCustomer("user").then(result=>{
        if(result1[0]==undefined){
            req.flash('info','Username or password incorrect!')
                res.redirect('back')
        }
        else if(result1){
            var data=result1[0]
            console.log("result....",data)
            //Verifying password:
            if(data.upass==req.body.upass){
              
              //Generating token based on user id:
              var token = jwt.sign({ id: data.uid }, 'supersecret', {
                expiresIn: 300 // expires in 5 minutes
              })  
                var pagedata={"title":"List of customers","pagename":"allCustomers",token:token,unm:req.body.unm,customers:result}
                res.render("layout",pagedata)
            }
            else{
                req.flash('info','Username or password incorrect!')
                res.redirect('back')
            }
        }
    });
    })
    .catch(error=>{
        res.status(400).json({status:0,error:error})
    })
})

//API for customer login:
router.post('/customer',function(req,res){
    console.log("req.body of customer..",req.body);
    //Function to search a customer based on usertype and username:
    allQueries.findwhere("user",req.body).then(result1=>{
        if(result1[0]==undefined){
            req.flash('info','Username or password incorrect!')
                res.redirect('back')
                //res.send({status:0,error:"Username or password incorrect!"})
        }
        else if(result1){
            var data=result1[0]
            allQueries.getTransactions("accounts",{uid:data.uid}).then(result=>{
            console.log("transactions of uid ",data.uid,": ",result)
            console.log("result....",data)
            //Verifying password:
            if(data.upass==req.body.upass){

              //Generating token:
              var token = jwt.sign({ id: data.uid }, 'supersecret', {
                expiresIn: 300 // expires in 5 minutes
              })  
                var pagedata={"title":"customer profile","pagename":"customerProfile",token:token,transactions:result,uid:data.uid,unm:data.unm,net_bal:data.net_bal}
                res.render("layout",pagedata)
            }
            else{
                req.flash('info','Username or password incorrect!')
                res.redirect('back')
                //res.send({status:0,error:"Username or password incorrect!"})
            }
        })
        }
    })
    .catch(error=>{
        res.status(400).json({status:0,error:error})
    })
})
module.exports=router;