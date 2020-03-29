const Project = require('../models/project.model')
const Task = require('../models/task.model')

module.exports = {
    create (req, res) {
        Project.findOne({_id: req.params.projectId}, (err, project) => {
            if (err) {
                return this._handleResponse(err, null, res)
            }

            if (!project) {
                return this._handleResponse("Error", null, res)
            }

            Task.create({title: req.body.title}, (err, task) => {
                project.tasks.push(task._id)
                project.save(() => {
                    this._handleResponse(err, task, res)
                })
            })
        })
    },
    delete (req, res) {
      
      Task.deleteOne({_id: req.params.taskId}, (err,task) => {
        if (err) {
          return this._handleResponse(err, null, res)
        }

        if (!task) {
            return this._handleResponse("Error", null, res)
        }
        this._handleResponse(err, task, res)
      })
      
    },
    _handleResponse (err, data, res) {
        if (err) {
            res.status(400).end()
        } else {
            res.send(data)
        }
    },
}
