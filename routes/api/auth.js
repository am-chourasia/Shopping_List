const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User.model');
const config = require('config');
const { model } = require('mongoose');
const { json } = require('body-parser');
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken');

// POST api/auth
// Auth user
// public
router.post('/', (req,res)=>{
    const {email, password} = req.body;
    //Simpler validation
    if(!email || !password){
        return res.status(400).json( { msg: " Please enter all feilds "})
    }
    //Check for existing user
    User.findOne({email})
        .then( user => {
            if(!user)
                return res.status(400).json({ msg: "User does not exist"})

            bcrypt.compare(password, user.password)
                .then( isMatch =>{
                    if(!isMatch)
                        return res.status(400).json({ msg: "Invalid Credentials"});
                    
                    jwt.sign(
                        {id: user.id},
                        config.get('jwtSecret'),

                        (err, token) => {
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

// GET api/auth/user
// Returns the user logged in
// Private
router.get('/user', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) throw Error('User Does not exist');
      res.json(user);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

module.exports = router;