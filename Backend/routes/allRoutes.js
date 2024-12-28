const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const user = require('../models/user');
const document = require('../models/document');

dotenv.config();

router.post('/register', async (req, res) => {
    const {fullName, email, password} = req.body;

    const oldUser = await user.findOne({email});
    if(oldUser) return res.status(400).json({message: "user already registered!"});

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new user({
        fullName,
        email,
        password: hash
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json();
    } catch (error) {
        console.log("Error occured : ", error.message);
        res.status(500).json({message: "something went wrong!"});
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        const foundUser = await user.findOne({email});
        if(!foundUser) return res.status(400).json({message: 'Incorrect email or password'});
        
        bcrypt.compare(password, foundUser.password, (err, result) => {
            if(err) return res.status(500).json({message: "something went wrong"});
            if(!result) return res.status(400).json({message: "Incorrect email or passsword"});

            const token = jwt.sign({id: foundUser._id}, "secretKey1234", {expiresIn: '1h'});
            res.json({token, foundUser});
        })
    } catch (error) {
        console.log("Error occured : ", error.message);        
        res.status(500).json({message: "Server Error:"})
    }
})

router.post('/createDocument/:id', async (req, res) => {
    const {title, content} = req.body;
    const userID = req.params.id;

    try {
        const newDoc = new document({
            title,
            content,
            owner: userID
        })
        await newDoc.save();
        res.status(200).json();
    } catch (error) {
        console.log("Error occured : ", error.message);        
        res.status(500).json({message: "Internal Error:"})
    }
})

router.get('/getAllDocuments', async (req,res) => {
    try {
        const allDocs = await document.find();
        res.status(200).json(allDocs);
    } catch (error) {
        console.log("Error occured : ", error.message);
        res.status(500).json({message: "Internal Error:"});
    }
})

module.exports = router;