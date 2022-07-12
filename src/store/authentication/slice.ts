import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./thunk";
import { AuthenManager } from "../../core/utils";
interface UserData {
  userName: string;
  id: string;
  role: string;
}

interface Authen {
  loading: any;
  status: any;
  data: UserData;
}

export const authenicationSlice = createSlice({
  name: "authentication",
  initialState: {
    loading: null,
    status: null,
    data: {
      userName: "",
      id: "",
      role: "",
    },
  } as Authen,
  reducers: {
    clear: (state, action) => {
      let keyState = Object.keys(state);
      let data = action.payload;
      data.forEach((item: any) => {
        if (keyState.includes(item)) {
          if (item === "data") {
            state.data = {
              userName: "",
              id: "",
              role: "",
            };
            AuthenManager.clear();
          } else {
            state = {
              ...state,
              [item]: null,
            };
          }
        }
      });
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(userLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        const mockData = {
          userName: "state.userData.userName",
          id: "state.userData.userName",
          token: "state.userData.userName",
          role: "state.userData.userName",
        };
        state.loading = false;
        state.status = true;
        state.data.userName = mockData?.userName;
        state.data.id = mockData?.id;
        state.data.role = mockData?.role;
        AuthenManager.shared().setToken(mockData.token);
      })
      .addCase(userLogin.rejected, (state, action) => {
        const mockData = {
          userName: "state.userData.userName",
          id: "state.userData.userName",
          token: "state.userData.userName",
          role: "state.userData.userName",
        };
        state.loading = false;
        state.status = true;
        state.data.userName = mockData?.userName;
        state.data.id = mockData?.id;
        state.data.role = mockData?.role;

        AuthenManager.shared().setToken(mockData.token);
      });
  },
});

const { clear } = authenicationSlice.actions;
export { userLogin, clear };

export default authenicationSlice.reducer;
