import { configureStore } from "@reduxjs/toolkit";
import profileReducer from './profileSlice';
import userReducer from './userSlice';
import cardsReducer from './cardsSlice'

export default configureStore({
    reducer: {
        profile: profileReducer,
        user: userReducer,
        cards: cardsReducer
    }
})
