import React, { useContext} from 'react'
import { ChatContext } from '../context/ChatContext';
import Typetext from './Typetext';
import Messages from './Messages';

const Chatside = () => {


  const { data } = useContext(ChatContext);
  const { dispatch } = useContext(ChatContext);


  const closeChat = () => {
    dispatch({
      type: "CLOSE_CHAT", payload: {
        chatId: "null",
        user: {}
      }
    })

  }

  return (
    <>


      {data.chatId !== "null" ? <div className='bg-indigo-100 w-full   flex flex-col justify-between '>



        <div className='p-2 pl-4 flex items-center gap-x-2 justify-between ' style={{ backgroundColor: "#ddddf7" }}>
          <div className='flex gap-x-2 items-center'>
            <img className=' h-10 w-10' src={data.user?.photoURL} alt="" />
            <p className='capitalize'> {data.user?.displayName}</p>
          </div>
          <button onClick={closeChat} className='p-2 bg-indigo-200 button'>  Close &#x2715;</button>
        </div>


        <Messages />

        <Typetext />
      </div> : <div className='flex flex-col gap-y-4 w-full h-full messages items-center justify-center shadowed'>
        <p className='p-4 rounded-xl bg-indigo-200 '>No chat selected</p>
      </div>}
    </>
  )
}

export default Chatside