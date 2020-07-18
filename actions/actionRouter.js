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

router.get("/:id", validateId, (req, res)=>{
    res.status(200).json(req.action);
})

router.post("/:id", async (req, res)=>{
 try{
        const addActions = await Action.insert(req.body);
        res.status(201).json(addActions);
    } catch (err){
        res.status(500).json({
            err: "You need to add these actions, okay?"
        })
    }
})

router.delete("/:id", validateId, async (req, res)=>{
    try{
        await Action.remove(req.params.id);
        res.status(200).json({
            message: "Successfully deleted!",
            action: req.action
        })
    } catch (err){
        console.log(err)
        res.status(500).json({
            err: "I think you broke it!"
        })
    }
})
router.put("/:id", validateId, async(req, res)=>{
    try{
        await Action.update(req.params.id, req.body);
        res.status(200).json({
            id: Number(req.params.id),
             ...req.body,
             message: "This action has been updated"
        })
    } catch (err){
        res.status(500).json({
            err: "Nope, I think you broke it..."
        })
    }
})


// My custom middleware

async function validateId(req, res, next){
const { id } = req.params;

 try{
        const validAction = await Action.getById(id);
        if(validAction === undefined){
        res.status(400).json({ err: "This Id doesn't exist"});
    } else {
        req.action = validAction;
        next()
    }
} catch (err) {
    console.log(err);
    res
    .status(500)
    .json({
        err: "Unable to retrieve the post with this ID."
         })
}
}

module.exports = router;