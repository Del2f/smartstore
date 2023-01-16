import { createSlice } from "@reduxjs/toolkit";


// state의 초기값 (유저 정보)
const initialState = {
  id: "",
  name: "",
};

// userSlice라는 이름으로 유저 Slice 생성
export const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: { 
    loginUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

// actions
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const { loginUser } = userSlice.actions;

//reducer
export default userSlice.reducer;

export const selectCurrentUser = (state:any) => state.user
