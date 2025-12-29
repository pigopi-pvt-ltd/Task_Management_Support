import { createSlice } from "@reduxjs/toolkit";

let initialValue = {
  liveChatRoomInfo: {
    messages: [],
    chatRoom: null,
    userInfo: null,
  },
  screenShareData: null,
  screenShareRequested: false,
  voiceShareData: null,
  voiceShareRequested: false,
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
    setScreenShareData: (state, action) => {
      state.screenShareData = action.payload.screenShareData;
    },
    setScreenShareRequest: (state, action) => {
      state.screenShareRequested = action.payload.screenShareRequested;
    },
    setvoiceShareData: (state, action) => {
      state.voiceShareData = action.payload.voiceShareData;
    },
    setVoiceShareRequest: (state, action) => {
      state.voiceShareRequested = action.payload.voiceShareRequested;
    },
    resetLiveChatRoom: (state, action) => {
      state.liveChatRoomInfo = initialValue.liveChatRoomInfo;
      state.screenShareData = initialValue.screenShareData;
      state.screenShareRequested = initialValue.screenShareRequested;
      state.voiceShareData = initialValue.voiceShareData;
      state.voiceShareRequested = initialValue.voiceShareRequested;
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
  setScreenShareData,
  setScreenShareRequest,
  setvoiceShareData,
  setVoiceShareRequest,
  resetLiveChatRoom,
} = chatSupportSlice.actions;
export default chatSupportSlice;
