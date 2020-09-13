//This file contains routes to all other files of controller folder
var express=require("express");
var router=express.Router();
router.use("/banker",require("../controller/banker"));
router.use("/customer",require("../controller/customer"));
router.use("/home",require("../controller/home"));
router.use("/login",require("../controller/login"));
module.exports=router;