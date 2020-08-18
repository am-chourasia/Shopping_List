const express = require('express');
const router = express.Router();

const Item = require('../../models/Item.model');
const { model } = require('mongoose');

// GET api/items
// get all the items
// public
router.get('/', (req,res)=>{
    Item.find()
        .sort({date: -1})
        .then( (items) => res.json(items))
})

// POST api/items
// post an item 
// public
router.post('/', (req,res)=>{
    console.log(req.body);
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save()
        .then( (item) => res.json(item))
        .catch( (err) => console.log("Error: "+err));
})

// DELETE api/items
// delete an item by id
// public
router.delete('/:id', (req,res)=>{
    Item.findByIdAndDelete(req.params.id)
        .then( ()=> res.json( {Success : true}))
        .catch( (err) => res.json( { Success: false}));
})

module.exports = router;