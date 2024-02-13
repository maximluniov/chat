import React, { useState } from 'react'
import index from '../assets/index'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";


const Register = () => {


  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0]


    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file?file: index.user ).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };




  return (
    <div className='flex  h-lvh items-center justify-center bg-indigo-50'>

      <div className='bg-indigo-100   px-20 py-6 rounded-xl font '>
        <h1 className='text-3xl mb-4'>Welcome to S-Chat!</h1>
        <h2>Registration</h2>


        <form className='flex flex-col gap-y-1 ' onSubmit={handleSubmit} >
          <input className='bg-white flex w-full h-10 items-center my-2 p-2 ' type="text" placeholder='Your name' />
          <input className='bg-white flex w-full h-10 items-center my-2 p-2 ' type="email" placeholder='Your e-mail' />
          <input className='bg-white flex w-full h-10 items-center my-2 p-2 ' type="password" placeholder='password' />


          <label className='cursor-pointer flex items-center' htmlFor="file">
            <img className='w-16' src={index.addphoto} alt="addphoto" />
            <p>
              Add an avatar
            </p>
          </label>
          <input id='file' className='hidden my-2 p-2 ' type="file" placeholder='Add an avatar' />




          <button type='submit' disabled={loading} className='w-full p-2 bg-indigo-400 rounded-md ' >Sign Up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <div>error</div>}
        </form>

        <p className='mt-4'>
          You have an account?  <Link to='/login' className='text-sky-600'>Login</Link>
        </p>


      </div>




    </div>
  )
}

export default Register