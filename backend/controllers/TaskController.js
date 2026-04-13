const TaskModel = require("../models/TaskModel")


const createTask= async (req,res)=>{
    const data=req.body

try{

    const model=new TaskModel(data)
    await model.save();
    res.status(201)
    .json({message:"Task is created",success:true})


}catch(err){
    res.status(500).json({message:"Failed to create task",success:false,error:err.message})
}


}



const fetchAllTasks= async (req,res)=>{
   

try{

    const data= await TaskModel.find({});
  
    res.status(200)
    .json({message:"All Task",success:true,data})


}catch(err){
    res.status(500).json({message:"Failed to get task",success:false,error:err.message})
}


}


const updateTaskById= async (req,res)=>{
   

try{

    const id=req.params.id;
    const body=req.body
    const obj={$set:{...body}}

    const data= await TaskModel.findByIdAndUpdate(id,obj);
  
    res.status(200)
    .json({message:"Task updated",success:true,data})


}catch(err){
    res.status(500).json({message:"Failed to update task",success:false,error:err.message})
}


}



const deleteTaskById= async (req,res)=>{
   

try{

        const id=req.params.id;
    const data= await TaskModel.findByIdAndDelete(id);
  
    res.status(201)
    .json({message:"Task is deleted",success:true,data})


}catch(err){
    res.status(500).json({message:" task is deleted",success:false,error:err.message})
}


}


module.exports={createTask,fetchAllTasks,updateTaskById,deleteTaskById}