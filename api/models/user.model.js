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
   

},
avatar:{
    type:String,
    default:"https://www.bing.com/images/search?view=detailV2&ccid=audMX4ZG&id=91C62FEB5CD9E7C6B2E53FD4AE68C81B21A034E4&thid=OIP.audMX4ZGbvT2_GJTx2c4GgHaHw&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.6ae74c5f86466ef4f6fc6253c767381a%3frik%3d5DSgIRvIaK7UPw%26riu%3dhttp%253a%252f%252fwww.pngall.com%252fwp-content%252fuploads%252f5%252fProfile-Avatar-PNG.png%26ehk%3dGVMh4KTpyOBERsOt5H%252b8TcGp%252bS8DdbR6niBs54kRaYA%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=900&expw=860&q=profile+image&simid=608050439365614916&FORM=IRPRST&ck=7FAAC3925C17C8B8F46B9497DF53B4FF&selectedIndex=0&itb=1"
},
},{timestamps:true});

const User=mongoose.model('User',userSchema);

export default User;