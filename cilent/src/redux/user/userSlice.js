import { createSlice } from '@reduxjs/toolkit';
import { useReducer } from './user/userSlice';
import { updateUser } from '../../../../api/controllers/user.controller';
import { deleteUser } from 'firebase/auth';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => { // Corrected spelling
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserstart:(state)=>{
      state.loading=true;
    },
    updateUserSuccess:(state,action)=>{
    state.currentUser=action.payload;
    state.loading=false;
    state.error=null;},
    updateUserFailure:(state,action)=>{
      state.error=action.payload;
      state.loading=false;
    },

    deleteUserStart:(state)=>{
      state.loading=true;
    },
    deleteUserSucess:(state)=>{
      state.currentUser=null;
      state.loading=false;
      state.error=null;
    },
    deleteUserFailure:(state,action)=>{
      state.error=action.payload;
      state.loading=false;
    }
  },
});

export const { signInStart, signInSuccess, signInFailure ,updateUserFailure,updateUserSuccess,updateUserstart,deleteUserStart,deleteUserSucess,deleteUserFailure} = userSlice.actions; // Corrected spelling
export default userSlice.reducer;
