const express=require("express")
const { createTask, fetchAllTasks, updateTaskById, deleteTaskById } = require("../controllers/TaskController")
const router=express.Router()




// TO CREATE task
router.post("/",createTask)
router.get("/",fetchAllTasks)
router.put("/:id",updateTaskById)
router.delete("/:id",deleteTaskById)


module.exports=router