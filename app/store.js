import { configureStore } from "@reduxjs/toolkit";
import profileReducer from './profileSlice';
import userReducer from './userSlice';

export default configureStore({
    reducer:{
        profile: profileReducer,
        user: userReducer 
    }
})
