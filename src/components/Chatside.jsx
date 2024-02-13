import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext';
import Typetext from './Typetext';
import Messages from './Messages';
const Chatside = () => {


  const { data } = useContext(ChatContext)





  return (
    <>
      <div className='bg-indigo-100 w-full py-2 flex flex-col justify-between'>

        <div className='p-2 flex items-center gap-x-2'>
            <img className='w-10' src={data.user.photoURL} alt="" />
            <p className='capitalize'> {data.user?.displayName}</p>
        </div>

       
        <Messages/>

        <Typetext />
      </div>
    </>
  )
}

export default Chatside