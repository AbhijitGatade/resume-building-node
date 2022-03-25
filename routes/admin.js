var express = require("express");
var bodyparser = require("body-parser");
const Objective = require("../models/Objective");
var jsonparser = bodyparser.json();
const router = express.Router();

router.post("/login/", async(req, res)=>{
    let body = req.body;
    let status = "";
    if(body.data.username == "admin" && body.data.password == "admin")
    {
        status = "success";
    }
    else{
        status = "failed";
    }
    let data = {
        "data":
        {
            "status":status
        }
    }
    res.end(JSON.stringify(data));
});

module.exports = router;