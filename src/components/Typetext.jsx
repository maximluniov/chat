import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import { v4 as uuid } from "uuid";

import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

const Typetext = () => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [text, setText] = useState("");


  const handleSend = async () => {

    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });


    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
  };

  return (
    <div className='flex gap-x-2 items-center p-2' style={{ backgroundColor: "#ddddf7" }} >



      <div className='flex items-center gap-x-2 bg-white w-full' >
        <input type="text" onKeyDown={(e) => e.code === "Enter" && handleSend()} onChange={(e) => setText(e.target.value)} value={text} className='w-full h-8 m-1' />
      </div>
      <button className='w-40 h-10 bg-rose-50 hover:bg-indigo-300' disabled={text === ""} onClick={handleSend}>Send</button>
    </div>
  )
}

export default Typetext