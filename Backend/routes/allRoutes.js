const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const verifyToken = require('../middleware/auth');
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

            const token = jwt.sign({id: foundUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
            res.json({token, foundUser});
        })
    } catch (error) {
        console.log("Error occured : ", error.message);        
        res.status(500).json({message: "Server Error:"})
    }
})

router.post('/createDocument/:id', verifyToken, async (req, res) => {
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

router.get('/getAllDocuments', verifyToken, async (req,res) => {
    try {
        const allDocs = await document.find();
        res.status(200).json(allDocs);
    } catch (error) {
        console.log("Error occured : ", error.message);
        res.status(500).json({message: "Internal Error:"});
    }
})

router.get('/getUserDocs/:id', verifyToken, async (req,res) => {
    try {
        const userID = req.params.id;
        const allDocs = await document.find({owner: userID});
        res.status(200).json(allDocs);
    } catch (error) {
        console.log("Error occured : ", error.message);
        res.status(500).json({message: "Internal Error:"});
    }
})

router.get('/getDoc/:docID', verifyToken, async (req, res) => {
    try {
      const doc = await document.findById(req.params.docID)
      if (!doc) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.status(200).json(doc);
    } catch (error) {
      console.error("Error in backend:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
});  

router.put('/editDocument/:docID', verifyToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        const docID = req.params.docID;

        const doc = await document.findByIdAndUpdate(docID, { title, content }, { new: true });
        if (!doc) {
            return res.status(404).json({ message: "Document not found" });
        }

        req.io.to(docID).emit('receiveUpdate', { title, content }); // Notify clients in the room
        res.status(200).json(doc);
    } catch (error) {
        console.log("Error occurred:", error.message);
        res.status(500).json({ message: "Internal Error:" });
    }
});

router.delete('/deleteDoc/:docID', verifyToken, async (req,res) => {
    try {
        const docID = req.params.docID;
        await document.findOneAndDelete({_id: docID})
        res.status(200).json();
    } catch (error) {
        console.log("Error occured : ", error.message);
        res.status(500).json({message: "Internal Error:"});
    }
})

router.put('/editProfile/:userID', verifyToken, async (req,res) => {
    try {
        const {fullName, email} = req.body;
        const userID = req.params.userID;
        const updatedUser = await user.findByIdAndUpdate(userID, {
            fullName,
            email,
        }, { new: true })

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json();
    } catch (error) {
        console.log("Error occured : ", error.message);
        res.status(500).json({message: "Internal Error:"});
    }
})

module.exports = router;