import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
// local storage
import {
  getUserFromLocalStorage,
  setUserToLocalStorage,
  removeFromLocalStorage,
} from "../../utils/LocalStorage";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    loguotUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeFromLocalStorage();
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const { user } = payload;
      setUserToLocalStorage(user);
      toast.success(`Hello There ${user.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    // login
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      setUserToLocalStorage(user);
      toast.success(`Wellcom Back ${user.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = true;
      toast.error(payload);
    },
  },
});

export default userSlice.reducer;
export const { toggleSidebar, loguotUser } = userSlice.actions;
