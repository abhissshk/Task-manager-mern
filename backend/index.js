
require("dotenv").config()
const express=require("express")
const app=express()
const PORT=process.env.PORT||8000
const connectdb=require("./db/db")
const TaskRouter = require("./routes/TaskRouter")
const bodyParser = require("body-parser")
const cors=require("cors")




// middleware
app.use(bodyParser.json())
app.use(cors())

app.use("/task",TaskRouter)




app.listen(PORT,()=>{
    
    connectdb()
    console.log(`server is running on port no ${PORT}`)
})