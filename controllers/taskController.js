import Task from "../models/task.js";
import User from "../models/user.js";
export const createTask = async(req,res)=>{
      try {
         const {title, description, dueDate}= req.body;
         const task = new Task({
            title,
            description,
            dueDate,
            userId:req.id
         })
         await User.findByIdAndUpdate(req.id, { $push: { task: task.id } }, { new: true });
         await task.save();
         return res.status(201).json({message:"Task created successfully",task});
      } catch (error) {
        return res.status(500).json({message:"Internal server error"})
      }
}

export const getAllTasks = async(req,res) =>{
       try {
         const userId=req.id;
        const tasks = await Task.find({userId:userId});
        if(tasks){
            return res.status(200).json({message:"All tasks fetched successfully",tasks})
        }else{
            return res.status(404).json({message:"Task list is empty"})
        }
       } catch (error) {
         return res.status(500).json({message:"Internal server error"});
       }
}

export const updateTaskusingId= async (req,res) =>{
     const {taskId} = req.params;
     const {title, description, status}= req.body;
     try {
           let task = await Task.find({taskId});
           if(!task){
              return res.status(404).json({message:"Task not found"})
           }
           task = await Task.findOneAndUpdate({taskId},{title, description, status}, {new:true});
           return res.status(200).json({message:"Task updated successfully",task});
     } catch (error) {
                 return res.status(500).json({message:"Internal server error"});

     }
}

export const deleteTaskById = async(req,res) =>{
     const {taskId} = req.params;
     try {
            let task = await Task.findOne({taskId});
           if(!task){
              return res.status(404).json({message:"Task not found"})
           }
          await Task.findOneAndDelete({taskId})
           return res.status(200).json({message:"task deleted successfully"});
     } catch (error) {
         return res.status(500).json({message:"Internal server error"});
     }
}

export const filterTask = async (req,res)=>{
        const {status}= req.query;
        try {
            let filter= {};
             if(status){
                filter.status= new RegExp(status, "i");
             }
             const tasks = await Task.find(filter);
             if(tasks){
                return res.status(200).json({message:"all filtered tasks", tasks});
             }else{
                return res.status(404).json({message:"filtered list is empty"})
             }
        } catch (error) {
             return res.status(500).json({message:"Internal server error"});
        }
} 


export const getTaskbyId = async(req,res)=>{
     const {taskId}= req.params;
     try {
        const task = await Task.find({taskId});
        if(task){
           return res.status(200).json({message:"Task fetched successfully", task});
        }else{
          return res.status(404).json({message:"Task not found"});
        }
     } catch (error) {
        return res.status(500).json({message:"Internal server error"});
     }
}