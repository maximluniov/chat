import React, { useState } from 'react'
import addphoto from '../assets/addphoto.png'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";


const Register = () => {


  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [image, setImage] = useState();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0]


    try {

      const res = await createUserWithEmailAndPassword(auth, email, password);


      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {

            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

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
      setImage(null);
    }
  };




  return (
    <div className='flex flex-col h-lvh items-center justify-center bg-indigo-50 font'>
      <h1 className='text-5xl mb-4 '>Welcome to S-Chat!</h1>
      <div className='bg-indigo-100   px-20 py-6 rounded-xl  '>
        <h2>Registration</h2>
        <form className='flex flex-col gap-y-1 ' onSubmit={handleSubmit} >
          <input className='bg-white flex w-full h-10 items-center my-2 p-2 ' type="text" placeholder='Your name' required />
          <input className='bg-white flex w-full h-10 items-center my-2 p-2 ' type="email" placeholder='Your e-mail' required />
          <input className='bg-white flex w-full h-10 items-center my-2 p-2 ' min={8} type="password" placeholder='password' required />
          <label className='cursor-pointer flex items-center' htmlFor="file">
            {image ? <img className='w-16' src={URL.createObjectURL(image)} alt="addphoto" />
              :
              <>
                <img className='w-16' src={addphoto} alt="addphoto" />
                <p>
                  Add an avatar
                </p></>}
          </label>
          <input id='file' className='hidden my-2 p-2 ' type="file" placeholder='Add an avatar' onChange={e => setImage(e.target.files[0])} required />
          <button type='submit' disabled={loading} className='w-full p-2 bg-indigo-400 rounded-md' >Sign Up</button>
          {loading && <div className='flex' >
            <div className='loader'></div>
            <p>Processing request</p>
          </div>}
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