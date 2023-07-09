const taskController =require('../controller/taskController')
const Trouter =require('express').Router()


Trouter.post('/addTask',taskController.addTask)
Trouter.get('/allTask',taskController.getAllTask)
Trouter.get('/:id',taskController.getOneTask)
Trouter.put('/:id',taskController.updateTask)
Trouter.delete('/:id',taskController.deleteTask)
module.exports = Trouter