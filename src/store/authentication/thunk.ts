import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../core/utils";

interface LoginInterfaces {
  email: string;
  password: string;
}

export const userLogin = createAsyncThunk(
  "authentication/login",
  async ({ email, password }: LoginInterfaces) => {
    const response = await axiosInstance.post("/login", { email, password });
    return response;
  }
);
