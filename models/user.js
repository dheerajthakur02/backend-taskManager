import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const UserSchema = new mongoose.Schema({
      name:{
          type:String,
          required:true
      },
      email:{
           type:String,
           required:true,
           unique:true
      },
      password:{
          type:String,
          required:true
      },
      task:{
          type:[mongoose.Schema.Types.ObjectId],
          ref:"Task",
          default:[]
      }
})

UserSchema.pre("save", async function (next){
     if(!this.isModified("password")){
         return next();
     }
     try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
     } catch (error) {
         next(error)
     }
})

export default mongoose.model("User",UserSchema);