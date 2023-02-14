const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// register

router.post('/register', async(req,res)=>{
    try{
        // bcrypt for secure password
        const saltRound = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, saltRound);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPass,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});




// login

router.post('/login', async (req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        !user && res.status(400).json("wrong credentials");

        const validated = await bcrypt.compare(req.body.password, user.password);
        const {password, ...other} = user._doc;
        if(!validated){

            return res.status(400).json("wrong credentials");
        }
        else{

            return res.status(200).json(other);
        }

    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;