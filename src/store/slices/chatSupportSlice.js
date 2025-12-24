import { createSlice } from "@reduxjs/toolkit";

let initialValue = {
  liveChatRoomInfo: {
    messages: [],
    chatRoom: null,
    userInfo: null,
  },
  onlineUsers: [],
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
    joinRoomClicked: (state, action) => {
      state.liveChatRoomInfo.chatRoom = action.payload.chatRoom;
    },
    setInitialOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload.onlineUsers;
    },
    addOnlineUser: (state, action) => {
      if (!state.onlineUsers.includes(action.payload.userId)) {
        state.onlineUsers.push(action.payload.userId);
      }
    },
    removeOnlineUser: (state, action) => {
      if (state.onlineUsers.includes(action.payload.userId)) {
        let startIndex = state.onlineUsers.findIndex((item) => {
          return item == action.payload.userId;
        });
        state.onlineUsers.splice(startIndex, 1);
      }
    },
  },
});

export const {
  setLiveChatRoomInfo,
  setRoomMessage,
  initializeMessages,
  joinRoomClicked,
  setInitialOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
} = chatSupportSlice.actions;
export default chatSupportSlice;
