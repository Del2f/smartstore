import { createSlice } from "@reduxjs/toolkit";


// state의 초기값 (유저 정보)
const initialState = {
  id: "",
  name: "",
};

// userSlice라는 이름으로 유저 Slice 생성
export const adminSlice = createSlice({
  name: 'admin',
  initialState, 
  reducers: { 
    AdminLogin: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

// actions
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const { AdminLogin } = adminSlice.actions;

//reducer
export default adminSlice.reducer;

export const selectCurrentAdmin = (state:any) => state.admin;
