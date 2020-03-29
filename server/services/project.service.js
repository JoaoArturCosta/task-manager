const Project = require('../models/project.model')
const User = require('../models/user.model')

module.exports = {
    create (req, res) {
        User.findOne({email: req.params.userEmail}, (err, project) => {
            if (err) {
                return this._handleResponse(err, null, res)
            }

            if (!project) {
                return this._handleResponse("Error", null, res)
            }

            Project.create({title: req.body.title}, (err, task) => {
                user.projects.push(task._id)
                project.save(() => {
                    this._handleResponse(err, task, res)
                })
            })
        })
    },
    _handleResponse (err, data, res) {
        if (err) {
            res.status(400).end()
        } else {
            res.send(data)
        }
    },
    getById(req, res) {
        Project.findOne({_id: req.params.projectId})
            .populate({
                path: "tasks",
                select: ["title", "body"],
                model: "Task",
            })
            .exec((err, project) => {
                this._handleResponse(err, project, res)
            })
    },
}
