import { errorHandler } from "../utills/error";
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import { errorHandler } from "../utills/error";
export const test=(req,res)=>{
    res.json({
        message:"Api route is working",
    });
};
//compare this snippet from api/routes/user.route.js


export const updateUser=async (req,res,next)=>{
    if(req.user.id!==req.params.id) return next(errorHandler(401,"you can only update your own account! "))
try{

if(req.body.password){
    req.body.password=bcryptjs.hashSync(req.body.password,10)
}


const updatedUser=await User.findByIdAndUpdate(req.params.id,{
    $set:{
    username:req.body.username,
    email:req.body.email,
    password:req.body.password,
    avatar:req.body.avatar,
}},
// if u don't addd this one we are going to get the old one
{new:true})

const {password,...rest}=updateUser._doc;
res.status(200).json(rest);
}
catch(error){
    next(error);
}
};

// main coed for dlelete
export const deleteUser=async(req,res,next)=>{
    if(req.user.id!==req.params.id)
        return next (errorHandler(401,'you can only delete your own account!'));
        try{
    await User.findByIdAndDelete(req.params.id);
    clearCookie('acess_token');
    res.status(200).json('user has been deleted')
    }catch(error){
    next(error);
}
};