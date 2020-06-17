const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

const User = require("../models/User");

const router = express.Router();

// generator token
function generateToken(params = {}){
    return token = jwt.sign({params}, authConfig.secret, {
        expiresIn:"10h"
    })
}

// New POST register: name, email, pass

router.post("/register", async (req, res) => {
    const { name, email, pass} = req.body;

    try {

        if(name == undefined || email == undefined || pass == undefined)
            return res.status(400).send({error: "missing data"});
        
        if(name.length < 6)
            return res.status(400).send({error: "name value must be minimum 6 characteres"});
        
        if(email.indexOf("@") == -1)
            return res.status(400).send({error: "enter a valid email"});
        
        if(pass.length < 6)
            return res.status(400).send({error: "pass value must be minimum 6 characteres"});
        
        email = email.toLowerCase(); 
        
        if(await User.findOne({where: {email}}))
            return res.status(400).send({error: "this email already in use"});

        const hash = await bcrypt.hash(pass, 10);

        user = await User.create({name, email, pass: hash});
        user.pass = undefined;
        
        return res.status(200).send({user});
        
    } catch (error) {
        return res.status(400).send({error: "ERRO FEDERAL, "+error});
    }        
});

// Authenticate POST

router.post("/authenticate", async (req, res) => {
    const { email, pass } = req.body;

    try {
        if(email == undefined || pass == undefined)
            return res.status(400).send({error: "missing data"});

        const user = await User.findOne({where: {email}});

        if (!user)
            return res.status(404).send({error: "user not found"});

        if(!await bcrypt.compare(pass, user.pass))
            return res.status(401).send({error: "invalid password"});
        
        user.pass = undefined;


        return res.status(200).send({user, token});

    } catch (err) {
        return res.status(400).send({error: "ERRO FEDERAL, "+error});
    }
    
});



module.exports = app => app.use("/auth", router);