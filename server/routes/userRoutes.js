const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const authenticate = require("../middlewre/authenticate");
let alert = require('alert');

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() =>{//.DB/conn 
    console.log(`Connected to database`);
    }).catch((err) =>console.log(err));

const User = require("../model/userModel");

router.get('/',(req,res)=>{
    res.send(`heeloo world`);
})

router.post("/register", async (req,res) => {
    const{name, email, password, cpassword} = req.body
    if(!name|| !email || !password || !cpassword ){
        return res.status(422).json({ error: "Please Fill Properly" });
    }
    try{
       const userExist = await User.findOne({ email:email});

       if(userExist){
           return res.status(422).json({ error: "Email Already Exist"});
       }else if (password != cpassword){
           return res.status(422).json({error:"Passwords are not matching"});
       }else{
           const user = new User({name, email, password, cpassword});
           await user.save();
           res.status(201).json({message: "User Registered Successfully!"});
       }

    } 
    catch(err){
        console.log(err);
    }
});

//Login Route

router.post('/login', async (req,res) => {
    try{
        let token;
        const{email,password} = req.body;

        if(!email || !password){
            return req.status(400).json({error:"Please Fill Data"})
        }

        const userLogin = await User.findOne({ email:email});

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token,{
                expires:new Date(Date.now()+ 25892000000),
                httpOnly:true
            });

            if (!isMatch){
                res.status(404).json({ error: "Invalid Credantials"});
                alert("Password Doesn't Match"); 
            }else{
              res.json({ message: "User Signup Successfully", user: isMatch});
              window.alert("Login Successful"); 
              
            }
            }else{
                res.status(400).json({ error: "Invalid Credantials"});
            }
        }catch(err){
                  console.log(err);
        }
});

router.get('/getdata', authenticate, (req, res) => {
    console.log("I am getdata");
    res.send(req.rootUser);
})

router.get('/books', authenticate, (req, res) => {
    console.log("I am getdata");
    res.send(req.rootUser);
})

router.get('/add', authenticate ,(req, res) => {
    console.log("This is Add Page");
    res.send(req.rootUser);
});


router.get('/logout', (req, res) => {
    console.log("This is logout Page");
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User Logout');
});

module.exports = router;