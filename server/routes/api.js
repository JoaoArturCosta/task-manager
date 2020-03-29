const express = require("express")
const router = express.Router()
const userService = require("../services/user.service")
const projectService = require("../services/project.service")
const taskService = require("../services/task.service")
const withAuth = require('../middleware');




router.post("/register", userService.registerUser.bind(userService))
router.post('/authenticate', userService.authenticate.bind(userService))
router.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
  })
router.get("/userprojects/:userEmail", withAuth, userService.getByEmail.bind(userService))
router.post("/userprojects/create/:userEmail", withAuth, projectService.create.bind(projectService))
router.get("/userprojects/project/:projectId", withAuth, projectService.getById.bind(projectService))
router.post("/tasks/:projectId", withAuth, taskService.create.bind(taskService))
router.post("/tasks/delete/:taskId", withAuth, taskService.delete.bind(taskService))

module.exports = router
