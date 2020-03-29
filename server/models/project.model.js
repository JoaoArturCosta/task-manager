const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = Schema.Types;
const Task = require("./task.model")

const ProjectSchema = new Schema({
    title: Types.String,
    tasks: [
        {type: Types.ObjectId, ref: "Task", default: []}
    ]
})

module.exports = mongoose.model("Project", ProjectSchema, "projects")
