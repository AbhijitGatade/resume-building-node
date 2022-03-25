var express = require("express");
var bodyparser = require("body-parser");
const Hobby = require("../models/Hobby");
var jsonparser = bodyparser.json();
const router = express.Router();

router.post("/save", async(req, res)=>{
    let body = req.body;
    let hobby = new Hobby();
    if(body.data.id != ""){
        hobby = await Hobby.findById(body.data.id);
    }
    hobby.title = body.data.title;
    hobby.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/list", async(req, res)=>{
    let hobbys = await Hobby.find();
    res.json({data:hobbys});
});

router.post("/get", async(req, res)=>{
    let body = req.body;
    let hobbys = await Hobby.findById(body.data.id);
    res.json({data:hobbys});
});

router.post("/delete", async(req, res)=>{
    let body = req.body;
    await Hobby.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status":"success"
        }
    }
    res.end(JSON.stringify(data));
});


module.exports = router;