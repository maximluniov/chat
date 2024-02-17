import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext';



const Profile = ({ onClick }) => {

    const { data } = useContext(ChatContext);



    return (
        <div onClick={onClick} className='bg-indigo-100 w-full   flex flex-col justify-between '>
            <div>
                <img className='w-68 h-80' src={data.user?.photoURL} onClick={onClick} alt="ava" />
                <p className='capitalize'> {data.user?.displayName}</p>
            </div>
        </div>
    )
}

export default Profile