var express = require("express");
var bodyparser = require("body-parser");
const Qualification = require("../models/Qualification");
var jsonparser = bodyparser.json();
const router = express.Router();

router.post("/save", async(req, res)=>{
    let body = req.body;
    let qualification = new Qualification();
    if(body.data.id != ""){
        qualification = await Qualification.findById(body.data.id);
    }
    qualification.title = body.data.title;
    qualification.save().then(result=>{
        res.end(JSON.stringify(result));
    }, err=>{
        res.end(JSON.stringify(err));
    });
});

router.post("/list", async(req, res)=>{
    let qualifications = await Qualification.find();
    res.json({data:qualifications});
});

router.post("/get", async(req, res)=>{
    let body = req.body;
    let qualifications = await Qualification.findById(body.data.id);
    res.json({data:qualifications});
});

router.post("/delete", async(req, res)=>{
    let body = req.body;
    await Qualification.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status":"success"
        }
    }
    res.end(JSON.stringify(data));
});


module.exports = router;