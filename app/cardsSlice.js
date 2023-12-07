import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "./firebase";
import { getDocs, collection, query } from "firebase/firestore";

export const fetchData = createAsyncThunk('cards/fetchData', async () => {
  const querySnapshot = await getDocs(query(collection(db, 'cards')))
  const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return data; // make an object from data fetched from firebase
});

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    data: {
      background: "",
      email: "",
      firstName: "Rena",
      group: "",
      lastName: "Shen",
      nameOfCard: "",
      owner: "",
      phone: "",
      profilePic: "",
    },
    status: "idle",
  },
  reducers: {
    loadCards: (state, action) => {
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

export const { loadCards } = cardsSlice.actions;

export default cardsSlice.reducer;
