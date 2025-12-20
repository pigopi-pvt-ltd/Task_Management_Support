import { createSlice } from "@reduxjs/toolkit";

let initialValue = {
  liveChatRoomInfo: {
    messages: [],
    chatRoom: null,
    userInfo: null,
  },
};
const chatSupportSlice = createSlice({
  name: "chatSupport",
  initialState: initialValue,
  reducers: {
    setLiveChatRoomInfo: (state, action) => {
      //   state.messages = action.payload.messages;
      state.liveChatRoomInfo.chatRoom = action.payload.chatRoom;
      state.liveChatRoomInfo.userInfo = action.payload.userInfo;
    },

    setRoomMessage: (state, action) => {
      state.liveChatRoomInfo.messages.push(action.payload.message);
    },
    initializeMessages: (state, action) => {
      state.liveChatRoomInfo.messages = action.payload.messages;
    },
  },
});

export const { setLiveChatRoomInfo, setRoomMessage, initializeMessages } =
  chatSupportSlice.actions;
export default chatSupportSlice;
