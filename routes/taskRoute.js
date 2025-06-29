import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createTask,getAllTasks,updateTaskusingId,deleteTaskById, filterTask} from "../controllers/taskController.js";

const route = express.Router();

route.post("/create-task",isAuthenticated,createTask);
route.get("/get-all-tasks",isAuthenticated,getAllTasks);
route.put("/update-task-using-id/:_id",isAuthenticated,updateTaskusingId);
route.delete("/delete-task-using-id/:_id",isAuthenticated,deleteTaskById);
route.get("/get-task-using-filter",isAuthenticated,filterTask);


export default route;