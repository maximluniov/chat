import React, { useContext } from 'react';
// import index from '../assets/index';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext'
const Header = () => {


  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <div className='flex items-center justify-between gap-x-2 p-2'>
      <div className='flex items-center gap-x-2'>
        <img src={  currentUser.photoURL } className='w-8 rounded-md bg-white' alt="ava" />
        <p className='capitalize'>
          {currentUser.displayName}
        </p>
      </div>

      <button className='bg-white rounded-md p-1' onClick={() => signOut(auth)}>Log Out</button>

    </div>


  )
}

export default Header