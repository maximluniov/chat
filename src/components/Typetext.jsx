import React, { useState ,useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import {v4 as uuid} from "uuid";
// import skrepka from '../assets/skrepka.png'
// import addphoto from '../assets/addphoto.png'

// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

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

  const [text,setText] = useState("");
 

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
    // setImg(null);
  };

  return (
    <div className='flex gap-x-2 items-center px-2 pt-2' >

    

<div className='flex items-center gap-x-2 bg-white w-full'> 
        {/* <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img className='h-8' src={skrepka} alt="x" />
        </label>

        <input
          type="file"
          style={{ display: "none" }}
          id="photo"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="photo">
          <img className='h-8' src={addphoto} alt="x" />
        </label> */}
        <input type="text" onKeyDown={(e)=>e.code==="Enter"&& handleSend()} onChange={(e)=>setText(e.target.value)  }  value={text} className='w-full h-10  '/>
      </div>

      

      

      <button className='w-40 h-10 bg-rose-50 hover:bg-indigo-300' disabled={text===""}  onClick={handleSend}>Send</button>
    </div>
  )
}

export default Typetext