import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "./firebase";
import { doc, getDoc, getDocs, collection, query } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { getAuthUser } from "../app/authManager";

export const fetchUserData = createAsyncThunk("users/fetchUserData", async () => {
  // const querySnapshot = await getDocs(query(collection(db, "users")));
  // const data = querySnapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data(),
  // }))[0];
  // return data;
  console.log("--------------yolo111");
  const currentAuthUser = getAuthUser();
  console.log("--------------yolo222");
  console.log(currentAuthUser.uid);
  const docRef = doc(db, "users", currentAuthUser.uid);
  
  console.log("--------------yolo333");
  const docSnapshot = await getDoc(docRef);
  
  console.log("--------------yolo");
  console.log(docSnapshot.data());
  return docSnapshot.data();
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {
      // basicInfo: {
      //   bio: "",
      //   firstName: "",
      //   lastName: "",
      //   links: [],
      // },
      // has_group: "",
      // id: "",
      // myCards: [],
      // profilePic: "",
      // theirCards: [],
      displayName: "",
      email: "",
      myCards: [],
      theirCards: [],
    },
    userStatus: "idle",
  },
  reducers: {
    loadUsers: (state, action) => {
      state.userData = { ...action.payload };
      // taken from week 10 Reducer.js
      state.users = { ...action.payload.users };
      state.userStatus = "succeeded";
    },

    addUsers: (state, action) => {
      state.userData = { ...action.payload };
      // taken from week 10 Reducer.js
      state.users = state.users.concat({ ...action.payload.users });
      state.userStatus = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = { ...action.payload };
        state.userStatus = "succeeded";
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.userStatus = "failed";
        state.userError = action.error.message;
      });
  },
});

export const { loadUsers, addUsers } = userSlice.actions;

export default userSlice.reducer;
