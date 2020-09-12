//This file contains routes to all other files of controller folder
var express=require("express");
var router=express.Router();
router.use("/banker",require("./banker"));
router.use("/customer",require("./customer"));
router.use("/home",require("./home"));
router.use("/login",require("./login"));
module.exports=router;