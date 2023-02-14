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



exports.signIn = async (req, res, next) => {

    console.log(req.body)

    try{
        const {email, password} = req.body;

        if(password == undefined || password.length === 0 || email == undefined || email.length === 0){
            return res.status(400).json({err:'bad parameter'})
        }

        const user = await User.findAll({where:{email: email}})
        const userdetail = user[0];

        if(userdetail.email === email && userdetail.password === password){
            return res.status(201).json({message: 'login success'})
        }

        if(userdetail.email === email && userdetail.password !== password){
            return res.status(401).json({err: 'Incorrect password'})
        }

        if(userdetail.password === password  && userdetail.email !== email){
            return res.status(404).json({err: 'User Not Found'})
        }

    
    }

    catch(err){
        res.status(500).json({err})
    }


}