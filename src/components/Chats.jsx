import React, { useState, useEffect, useContext } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';



const Chats = () => {
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext)
    const [chats, setChats] = useState([]);


    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())
            });
            return () => unsub()
        }
        currentUser.uid && getChats()


    }, [currentUser.uid]);

    const handleSelect = (user) => {
        console.log(user);
        dispatch({ type: "CHANGE_USER", payload: user })
    }


    return (
        <div className='h-full bg-indigo-200'>
            {Object.entries(chats).length > 0 ?
                Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                    <div key={chat[0]} className='flex p-2 gap-x-2 items-center chat cursor-pointer' onClick={() => handleSelect(chat[1].userInfo)}>
                        <img className='w-8' src={chat[1].userInfo.photoURL} alt="ava" />
                        <div className='flex flex-col'>
                            <p className='capitalize'>{chat[1].userInfo.displayName}</p>
                            <div className='flex gap-x-32'>
                                <p>{chat[1].lastMessage?.text.slice(0, 19)} {chat[1].lastMessage?.text.length > 19 ? "..." : null}   </p>
                            </div>
                        </div>
                    </div>
                )) : <div className='p-2'>To start messaging you need to find someone using search above and press Enter</div>
            }
        </div>
    )
}

export default Chats