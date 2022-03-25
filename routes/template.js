var express = require("express");
var bodyparser = require("body-parser");
const Template = require("../models/Template");
var jsonparser = bodyparser.json();
const router = express.Router();

router.post("/save", async(req, res)=>{
    let body = req.body;
    let template = new Template();
    if(body.data.id != ""){
        template = await Template.findById(body.data.id);
    }
    template.name = body.data.name;
    template.description = body.data.description;
    template.htmlfilepath = body.data.htmlfilepath;

    template.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/list", async(req, res)=>{
    let templates = await Template.find();
    res.json({data:templates});
});

router.post("/get", async(req, res)=>{
    let body = req.body;
    let templates = await Template.findById(body.data.id);
    res.json({data:templates});
});

router.post("/delete", async(req, res)=>{
    let body = req.body;
    await Template.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status":"success"
        }
    }
    res.end(JSON.stringify(data));
});


module.exports = router;