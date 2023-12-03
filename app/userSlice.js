import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "./firebase";
import { getDocs, collection, query } from "firebase/firestore";
import { useDispatch } from "react-redux";

export const fetchData = createAsyncThunk("users/fetchData", async () => {
  const querySnapshot = await getDocs(query(collection(db, "users")));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))[0];
  return data;
});

const userSlice = createSlice({
  name: "profile",
  initialState: {
    data: {
      basicInfo: {
        bio: "",
        firstName: "",
        lastName: "",
        links: [],
      },
      has_group: "",
      id: "",
      myCards: [],
      profilePic: "",
      theirCards: [],
    },
    status: "idle",
  },
  reducers: {
    loadUsers: (state, action) => {
      state.data = { ...action.payload };
      // taken from week 10 Reducer.js
      state.users = { ...action.payload.users };
      state.status = "succeeded";
    },

    addUsers: (state, action) => {
      state.data = { ...action.payload };
      // taken from week 10 Reducer.js
      state.users = state.users.concat({ ...action.payload.users });
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

export const { loadUsers, addUsers } = userSlice.actions;

export default userSlice.reducer;
