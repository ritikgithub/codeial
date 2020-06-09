const jwt = require('jsonwebtoken');
const User = require('../../../models/user');

module.exports.login = async function(req,res){
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user || user.password != req.body.password){
            return res.json({
                message: "Not Authenticated"
            });
        }

        return res.json({
            message:"Sign in successful AND here is your Token",
            data:{
                token: jwt.sign(user.toJSON(),'codeial',{expiresIn: '100000'})
            }
        });
    }catch(err){
        console.log("Error",err);
        return res.json(500,{
            message:"Internal Server Error"
        });
    }
    
    
};