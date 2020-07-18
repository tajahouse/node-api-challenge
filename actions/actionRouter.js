const express = require("express");
const Action = require('../data/helpers/actionModel');
const router = express.Router();

router.get("/", async (req, res)=>{
    try{
        const actions = await Action.get();
        res.status(200).json(actions);
    } catch (err) {
        res.status(500).json({
            err: "It looks broken!"
        })
    }
})

router.put("/:id", async (req, res)=>{
    try{
        const addActions = await Action.insert();
        res.status(201).json(addActions);
    } catch (err){
        res.status(500).json({
            err: "You need to add these actions, okay?"
        })
    }
})
module.exports = router;

// My custom middleware

async function validateId(req, res, next){
    const { id } = req.params;
    try{
        const validAction = await Action.getById(id)
    }
}