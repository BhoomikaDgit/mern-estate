import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
    username:{
    type:String,
    required:true,
    // everybody should have the different username
    uniqe:true,

},  email:{
    type:String,
    required:true,
    uniqe:true,

},  password:{
    type:String,
    required:true,
    // two user can have the same password
   

}},{timestamps:true});

const User=mongoose.model('User',userSchema);

export default User;