const express = require("express");
const { route } = require("./express");
const router = new express.Router();
const items = require('./fakeDb')
const ItemClass = require('./itemClass')
const ExpressError = require("./expressError")

router.get('/', function(req,res){
 res.json({item : items})
})

router.post('/', function(req,res){
    let newItem = {name: req.params.name, price: req.params.name};
    items.push(newItem)
    res.status(201).json({item : items})
   })

router.get('/:name', function(req, res){
    let foundItem = items.find(i => i.name === req.params.name)
    if(foundItem === undefined) throw new ExpressError("Item not found", 404)
    else res.json({ added : foundItem})
})

router.patch('/:name', function(req, res){
    let foundItem = items.find(i => i.name === req.params.name);
    if(foundItem === undefined) throw new ExpressError("Item not found", 404);
    else{
        foundItem.name = req.params.name;
        res.json({ updated : foundItem})
    } 
})

router.delete('/:name', function(req, res){
    let foundItem = items.find(i => i.name === req.params.name);
    if(foundItem === undefined) throw new ExpressError("Item not found", 404);
    else{
        items.splice(foundItem,1)
        res.json({ message : deleted})
    } 
})

module.exports = router;