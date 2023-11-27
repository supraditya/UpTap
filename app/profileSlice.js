import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "./firebase";
import { getDocs, collection, query } from "firebase/firestore";

export const fetchData = createAsyncThunk('profile/fetchData', async () => {
    const querySnapshot = await getDocs(query(collection(db, 'profile')))
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
    return data;
  });
  

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: {
      firstName: "John",
      lastName: "Doe",
    },
    status: "idle",
  },
  reducers: {
    loadProfile: (state, action) => {
      state.data = { ...action.payload };
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = { ...action.payload };
        state.status = "succeeded";
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { loadProfile } = profileSlice.actions;

export default profileSlice.reducer;
