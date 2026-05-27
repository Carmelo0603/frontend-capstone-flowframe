import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("flowframe_token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("flowframe_token", action.payload);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("flowframe_token");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
