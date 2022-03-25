var express = require("express");
var bodyparser = require("body-parser");
const Skill = require("../models/Skill");
var jsonparser = bodyparser.json();
const router = express.Router();

router.post("/save", async(req, res)=>{
    let body = req.body;
    let skill = new Skill();
    if(body.data.id != ""){
        skill = await Skill.findById(body.data.id);
    }
    skill.title = body.data.title;
    skill.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/list", async(req, res)=>{
    let skills = await Skill.find();
    res.json({data:skills});
});

router.post("/get", async(req, res)=>{
    let body = req.body;
    let skills = await Skill.findById(body.data.id);
    res.json({data:skills});
});

router.post("/delete", async(req, res)=>{
    let body = req.body;
    await Skill.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status":"success"
        }
    }
    res.end(JSON.stringify(data));
});


module.exports = router;