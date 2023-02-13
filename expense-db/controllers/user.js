const User = require('../models/users');

exports.signUp = async (req, res, next) => {

    console.log(req.body)

    try{
        const {name, email, password} = req.body;

        const user = User.findAll({where:{email}})
        if(user.length>0){
            return res.status(409).json({message:'user already exist'})
        }

        await User.create({name, email, password})
        .then(() => {
            res.status(201).json({message: 'successfully new user created'})
        })
        .catch(err => console.log(err))
    }

    catch(err){
        res.status(500).json(err)
    }


}