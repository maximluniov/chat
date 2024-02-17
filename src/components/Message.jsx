import React, { useContext, useRef, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

const Message = ({ message }) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"} flex items-center gap-x-3 flex-wrap`}
    >
      <div className="flex">
        <img className='w-8 rounded-full h-8'
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        {/* <span>just now</span> */}
      </div>

      <p className='break-all'>
        {message.text}
      </p>


    </div>
  )
}

export default Message