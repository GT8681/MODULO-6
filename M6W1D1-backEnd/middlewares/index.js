const isAuthenticated = async (req,res,next) => {
       if(req.headers["gt86"] === "x"){
           next();
    }else{
        res.status(401).send({
            statusCode:401,
            message:"do not Unauthorized"
        });
    }

}

module.exports =   isAuthenticated;
