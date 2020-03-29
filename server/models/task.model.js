const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = Schema.Types;

const TaskSchema = new Schema({
    title: Types.String,
    body: Types.String,
})

module.exports = mongoose.model("Task", TaskSchema, "tasks")