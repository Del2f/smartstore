import { createSlice } from "@reduxjs/toolkit";


// state의 초기값
const initialState = {
  isShowMenu: false,
};

// userSlice라는 이름으로 유저 Slice 생성
export const menuSlice = createSlice({
  name: 'menu',
  initialState, 
  reducers: { 
    showMenu: (state, actions) => {
      state.isShowMenu = actions.payload;
    },
  },
});

// actions
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const { showMenu } = menuSlice.actions;

//reducer
export default menuSlice.reducer;

export const selectShowMenu = (state:any) => state.menu
