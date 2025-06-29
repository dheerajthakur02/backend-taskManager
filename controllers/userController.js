import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const CreateUser = async (req,res) =>{
      try {
         const {name, email , password} = req.body;
         const existingUser = await User.findOne({email});
         if(existingUser){
             return res.status(400).json({message:"User already existed, please login"});
         }

        const user = new User({
            name, email , password
        })
        await user.save();
        return res.status(201).json({message:"User registered successfully!!",user});
      } catch (error) {
        return res.status(500).json({message:"Internal server error"})
      }
}

export const userLogin = async (req,res) =>{
      try {
         const {email, password}=req.body;

         if(!email || !password){
             return res.status(400).json({message:"Something is missing"})
         }
         let user = await User.findOne({email});
         if(!user){
            return res.status(400).json({
                message:"Incorrecr username or password"
            })
         }
          const isPasswordMatch=await bcrypt.compare(password,user.password)
       if(!isPasswordMatch){
        return res.status(400).json({
            message:"incorrect username or password",
            success:false
          })
       }
         const tokenData={
              userId:user._id
         }
         const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'})
        
         user={
            _id:user._id,
            name:user.name,
            email:user.email,
            address:user.address
         }
         return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
        message:`Login successfully !! Wecome ${user.name}`,
        user
       })
        } catch (error) {
          return res.status(500).json({message:"Internal server error"})
      }
}

export const getProfile= async (req,res)=>{
   try{
      const userId=req.id
      const user= await User.findById(userId).populate({
         path:"task",
         options:{sort :{createdAt:-1}}
      })
       return res.status(200).json({
        userData:user
       })
   }catch(err){
      console.log(error)
      return res.status(500).json({message:"Internal server error"})
   }
}

export const userlogout = async (req,res)=>{
  try{
     return res.status(200).cookie("token","",{maxAge:0}).json({
         message:"Logged out successfully"
     })
  }catch(error){
    console.log(error)
    return res.status(500).json({message:"Internal server error"})
  }
}
