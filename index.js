var express = require("express");
const mongoose = require("mongoose");

var app = express();
mongoose.connect("mongodb://localhost:27017/resumebuiling");
const db = mongoose.connection;
db.on("error", error=> console.log(error));
db.on("open", ()=> console.log("Connection Established"));

app.use(express.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method == "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.get("/", function(req, res){
    res.send("Hello Welcome to Resume Building");
    res.end();
});

app.get("/hello", function(req, res){

    res.send("This is hello page.");
    res.end();
});

app.use("/admin", require("./routes/admin"));
app.use("/objective", require("./routes/objective"));
app.use("/skill", require("./routes/skill"));
app.use("/hobby", require("./routes/hobby"));
app.use("/qualification", require("./routes/qualification"));
app.use("/template", require("./routes/template"));


app.listen(8081, function(){
    console.log("Node Server Started");
})