module.exports.ensureToken=function(req,res,next) {
    var bearerHeader=req.headers["authorization"];
    if(typeof bearerHeader!==undefined){
        var bearer=bearerHeader.split(" ");
        var bearerToken=bearer[1];
        req.token=bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}