import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../core/utils";

export const fetchCounter = createAsyncThunk(
  "counter/fetch-counter",
  async (id: number) => {
    const response = await axiosInstance.get("/countersdqw", { data: { id } });
    console.log(response);

    return response;
  }
);
