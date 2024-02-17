import React, { useContext, useState } from 'react';
// import index from '../assets/index';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import dropmenu from '../assets/dropmenu.png'
import hidedropmenu from '../assets/hidedropmenu.png'

const Header = ({ togglePage }) => {


  const [isOpen, setIsOpen] = useState(false);


  const [page,setPage] = useState(false);
  
  const handleClickAway = () => {
    setIsOpen(false);
  };

  const { currentUser } = useContext(AuthContext);




  return (
    <div className='flex items-center justify-between gap-x-2 p-2'>
      <div className='flex items-center gap-x-2'>
        <img src={currentUser.photoURL} className='w-8 h-8 rounded-full bg-white' alt="ava" />
        <p className='capitalize'>
          {currentUser.displayName}
        </p>
      </div>



      <ClickAwayListener onClickAway={handleClickAway}>
        <div className='flex flex-col items-center'>
          {isOpen?  
          <button className='relative' onClick={() => setIsOpen(prev => !prev)} ><img className='w-5' src={hidedropmenu} alt="" /></button> :
          <button className='relative' onClick={() => setIsOpen(prev => !prev)} ><img className='w-5' src={dropmenu} alt="" /></button>  }
          
          
          
          {isOpen ? 
          <div className='absolute  flex flex-col mr-40 mt-6  p-4 bg-white shadow-xl smooth' >
            <button className='bg-white rounded-md p-1 buttoncommon ' onClick={() => {togglePage(); setPage(prev => !prev)  ;setIsOpen(false)}}>{!page? "Full-screen mode" :"Turn-off full-screen" }</button>
            <button className='bg-white rounded-md p-1 button ' onClick={() => {signOut(auth) }}>Log Out</button>
           
          </div> 
          : null

          }
        </div>
      </ClickAwayListener>


      














    </div>


  )
}

export default Header