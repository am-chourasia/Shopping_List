const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User.model');
const config = require('config');
const { model } = require('mongoose');
const { json } = require('body-parser');

const jwt = require('jsonwebtoken');

// POST api/users
// Resgister New User
// public
router.post('/', (req,res)=>{
    const {name, email, password} = req.body;
    //Simpler validation
    if( !name || !email || !password){
        return res.status(400).json( { msg: " Please enter all feilds "})
    }
    //Check for existing user
    User.findOne({email})
        .then( user => {
            if(user)
                return res.status(400).json({ msg: "User already exist"})
            
            const newUser = new User({
                name, email, password
            })

            //Create salt Hash
            bcrypt.genSalt(10, (err, salt)=>{                           // a salt is the additional random string added to the password for the purpose of ubiquitous hashing 
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err)
                        throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then( user =>{

                            jwt.sign(                                  // singing means creating the jwt token signature using the data and the secret key that will later be used for verification of the token
                                {id: user.id},
                                config.get('jwtSecret'),
                                { expiresIn: 3600*24 },    // 24 hour expiration time of the token
                                (err, token) => {           // this is the callback after generating the token
                                    if(err) throw err;

                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )

                        })
                })
            })
        })

})

module.exports = router;