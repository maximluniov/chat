import { createContext, useContext, useReducer } from "react";

import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

  const { currentUser } = useContext(AuthContext)

  const INIT_STATE = {
    chatId: "null",
    user: {}
  }
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId: currentUser.uid > action.payload.uid
            ? currentUser.uid + action.payload.uid
            : action.payload.uid + currentUser.uid
        };
      case "CLOSE_CHAT":
        return {
          chatId: "null",
          user: {}
        };


      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INIT_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};