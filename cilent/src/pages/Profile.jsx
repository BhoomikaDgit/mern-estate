import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getStorage, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ref } from 'firebase/storage'; // Make sure to import 'ref' from 'firebase/storage'
import { errorHandler } from '../../../api/utills/error';
import {app} from '../firebase';
import {updateUserStart,updateUserStart,updateUserFailure,deleteUserFailure, updateUserSuccess,deleteUserStart,deleteUserSucess} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../api/controllers/user.controller';
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser ,loading,error} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess,setUpdateSucess]=useState(false);
  const dispatch=useDispatch();



  // update code in profile
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage();
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
          setFormData((prevData) => ({ ...prevData, avatar: downloadURL }))
        );
      }
    );
  };
const handleChange=async(e)=>{

setFormData({...formData,[e.target.id]:e.target.value});
};
const handleSubmit=(e)=>{
  e.preventDefault();
  try{
dispatch(updateUserStart());
const res=await fetch(`/api/user/update/${currentUser._id}`,
  {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(formData),
  });
  const data=await res.json();
if(data.success===false){
  dispatch(updateUserFailure(data.message));
  return;

} 
dispatch(updateUserSuccess(data)) ;
setUpdateSucess(true);
}
catch(error){
    dispatch(updateUserFailure(data.message));
    return;
  }

  dispatch(updateUserSuccess(data));
  setUpdateSucess(true);
}catch(error){
  dispatch(updateUserFailure(error.message));
}
};

  const handleDeleteUser=async()=>{
  
    try{
dispatch(deleteUserStart());
const res=await fetch(`api/user/delete/${currentUser._id}`,{
  method:'DELETE',
});
const data=await res.json();
if(data.sucess===false){
  dispatch(deleteUserFailure(data.message));
  return;
}
dispatch(deleteUserSucess(data));

    }catch(error){
      dispatch(deleteUserFailure(error.message));

    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form  onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={formData?.avatar||currentUser.avtar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error Image upload(image must be less than 2 mb)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image Successfully Uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input type="text" placeholder='username' defaultValue={currentUser.username} id='username' className='border p-3 rounded-lg' onChange={handleChange} />
        <input type="email" placeholder='email'  defaultValue={currentUser.email}id='email' className='border p-3 rounded-lg' onChange={handleChange} />
        <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...':'Upadate'}</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>

      {/* design part of update and unauthorized */}
      {/* no need 4:54 <p className='text-red-700 mt-5'>{error?error:""}</p> */}
<p className='text-green-700 mt-5'>{updateSuccess ? 'Sucess':''}</p>
    </div>
  );
}
