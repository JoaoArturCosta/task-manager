const faker = require('faker')
const User = require('../models/user.model')
const Project = require('../models/project.model')
const Task = require('../models/task.model')
const config = require('../config/index')

module.exports = {
    seedData () {
        Project.countDocuments((err, count) => {
            if (count > 0) {
                return;
            }

            this.getByEmail('me@example.com')
        })
    },
    
    getByEmail (_email) {
        User.find({email: _email}, (err,user) => {
            this.createProjectsForUsers(user)
        })
            
    },
    createProjectsForUsers (users) {
        users.forEach((user) => {
            this.createProjects(user)
        })
    },
    createProjects (user) {
        let projects = [];
        Array.from(Array(config.numberOfProjectsPerUser)).forEach((val, index) => {
            projects.push({
                title: index + faker.lorem.sentence(3),
            })
        })

        Project.insertMany(projects, (err, savedProjects) => {
            savedProjects.forEach((savedProject) => {    
                user.projects.push(savedProject.id)
            })
            user.save(() => {
                this.createTasksForProjects(savedProjects)
            })
        })
    },
    createTasksForProjects (projects) {
        projects.forEach((project) => {
            this.createTasks(project)
        })
    },
    createTasks (project) {
        let tasks = [];

        Array.from(Array(config.numberOfTasksPerProject)).forEach(() => {
            tasks.push({
                title: faker.lorem.sentence(5),
                body: faker.lorem.paragraph(1),
            })
        })

        Task.insertMany(tasks, (err, savedTasks) => {
            savedTasks.forEach((savedTask) => {
                project.tasks.push(savedTask.id)
            })
            project.save()
        })
    }
}