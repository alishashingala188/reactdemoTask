const Task =require('../model/taskModel');

const addTask = async(req,res)=>{
    let info ={
       title:req.body.title,
       date:req.body.date,
       description:req.body.description,
       time:req.body.time,
    }
    const task = await Task.create(info)
    res.status(200).send(task)
   }
   
   //2.get all products
   
   const getAllTask = async (req,res) => {
       let task = await Task.findAll({})
       res.status(200).send(task)
   }
   
   const getOneTask = async (req,res) => {
       let id=req.params.id
       let task = await Task.findOne({where:{id:id}})
       res.status(200).send(task)
   }
   //4. update product
   
   const updateTask = async (req,res) => {
       let id=req.params.id
       const task = await Task.update(req.body,{where:{id:id}})
       res.status(200).send(task)
   }
   //5. delete product by id
   const deleteTask = async (req,res) => {
       let id=req.params.id
      const task = await Task.destroy({where:{id:id}})
       res.status(200).send('task is deleted')
   }
   
   module.exports={
       addTask,
       getAllTask,
       getOneTask,
       updateTask,
       deleteTask
   }

