import express from "express";
import { CreateUser,userLogin,getProfile,userlogout } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const route = express.Router();

route.post("/create-user",CreateUser);
route.post("/login-user",userLogin );
route.get("/get-user-profile",isAuthenticated,getProfile);
route.get("/logout-user",isAuthenticated,userlogout);

export default route;