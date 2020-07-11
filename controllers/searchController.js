const User = require('../models/user');

module.exports.search = async function(req,res){
    let text = req.body.text;
    if(text=='')
        return res.json(200,[]);

    let users = await User.find({name: {$regex: text, $options: 'i'}},'name');

    return res.json(200,users);
};