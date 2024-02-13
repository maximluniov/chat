import React, {  useState,useContext } from 'react'
import { collection, query, where ,getDocs, serverTimestamp, getDoc } from "firebase/firestore";
import {db} from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { doc, setDoc ,updateDoc  } from "firebase/firestore";

function useInput(initValue){
  const [value,setValue]= useState(initValue);
  const onChange = event =>{
    setValue(event.target.value);
  }
  return {
    value,onChange
  }
}

const Searchbar = () => {
  // const input = useInput("")

  const { currentUser } = useContext(AuthContext);

    const [username,setUsername] =useState("")
    const[user,setUser] = useState(null);
    const[err,setErr]=useState(false);



    const handleKey = e =>{
      e.code === "Enter" && handleSearch();
    }

  const handleSearch = async () =>{
    const q = query(collection(db,"users"), where("displayName", "==", username));

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        setUser(doc.data());
      });
    }
    catch(err){
      setErr(true)
    }
    

  }

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };



    
  
  return (
    <div className='bg-indigo-200  p-4 flex flex-col items-center'>

      <input type="text" onKeyDown={handleKey} value={username} onChange={(e)=>setUsername(e.target.value)}  className='w-full bg-inherit border-b-2 ' />
      
      <div>
       {err && <div>User not found</div>}
       {user&& <div className='flex gap-x-40 cursor-pointer' onClick={handleSelect}>
        <img  className='w-10 ' src={user.photoURL} alt="ava" />
        <p>{user.displayName}</p>
       </div> }
      </div>

    </div>
  )
}

export default Searchbar