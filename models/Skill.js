const mongoose = require("mongoose");
const { MongoDBNamespace } = require("mongoose/node_modules/mongodb");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        title:{
            type:String,
            required: true
        }
    }
);
const Skill = mongoose.model("skills", schema);
module.exports = Skill;