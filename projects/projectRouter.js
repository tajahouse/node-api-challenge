const express = require("express");
const Project = require('../data/helpers/projectModel');
const { restart } = require("nodemon");

const router= express.Router();

router.get("/", async (req, res)=>{
    try{
        const projects = await Project.get();
        res.status(200).json(projects);
    } catch (err){
        res.status(500).json({
            err: 'Something is broken here'
        })
    }
})

router.get("/:id", validateId, (req, res)=>{
    res.status(200).json(req.projects)
})

router.post("/:id", async (req, res)=>{
    try{
        const addProject = await Project.insert(req.body);
        res.status(201).json(addProject)
    } catch{
        res.status(500).json({
            err: "You need to add these projects, okay?"
        })
    }
})

router.put("/:id", validateId, async(req, res)=>{
    try{
        await Project.update(req.params.id, req.body);
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

router.delete("/:id", validateId, async(req, res)=>{
    try{
        await Project.remove(req.params.id);
        res.status(200).json({
            message: "Successfully deleted!",
            actions: req.action
        })
    } catch(err){
        res.status(500).json({
            err: "I think you broke it! It's still there!. It won't go away!!!! HELP!!!!"
        })
    }
})

//My middleware

async function validateId(req, res, next){
    const { id } = req.params;
    
     try{
            const validProject = await Project.get(id);
            if(validProject === undefined){
            res.status(400).json({ err: "This ID doesn't exist"});
        } else {
            req.action = validProject;
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