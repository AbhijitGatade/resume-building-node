var express = require("express");
var bodyparser = require("body-parser");
const Objective = require("../models/Objective");
var jsonparser = bodyparser.json();
const router = express.Router();

router.post("/save", async(req, res)=>{
    let body = req.body;
    let objective = new Objective();
    if(body.data.id != ""){
        objective = await Objective.findById(body.data.id);
    }
    objective.title = body.data.title;
    objective.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/list", async(req, res)=>{
    let objectives = await Objective.find();
    res.json({data:objectives});
});

router.post("/get", async(req, res)=>{
    let body = req.body;
    let objectives = await Objective.findById(body.data.id);
    res.json({data:objectives});
});

router.post("/delete", async(req, res)=>{
    let body = req.body;
    await Objective.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status":"success"
        }
    }
    res.end(JSON.stringify(data));
});


module.exports = router;