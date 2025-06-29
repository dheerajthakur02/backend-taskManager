import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema({
     title:{
        type:String,
        default:""
     },
     description:{
        type:String,
        default:""
     },
     status:{
        type:String,
        enum:["pending","done"],
        default:"pending"
     },
     dueDate:{
        type:Date,
        required:true
     },
     userId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Task",
          required:true
     }
},{timestamps:true})


export default mongoose.model("Task",TaskSchema);