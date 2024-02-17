import React, {  useState,useContext } from 'react'
import { collection, query, where ,getDocs, serverTimestamp, getDoc } from "firebase/firestore";
import {db} from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { doc, setDoc ,updateDoc  } from "firebase/firestore";
import { ChatContext } from '../context/ChatContext';


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
   useInput("")

  const { currentUser } = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext)

    const [username,setUsername] =useState("")
    const[user,setUser] = useState(null);
    const[err,setErr]=useState(false);



    const handleKey = e =>{
      e.code === "Enter" && handleSearch() 
      
    }

  const handleSearch = async () =>{
    const q = query(collection(db,"users"), where("displayName", "==", username));
    
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
       
        setUser(doc.data());
        
      });
    }
    catch(error){
      console.log(error)
      setErr(true)
    }
    
 
  }

  const handleSelect = async () => {
   
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
      
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

       
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
      
    } catch (error) {}
    
    dispatch({type:"CHANGE_USER",payload:user})
    setUser(null);
    setUsername("")
  };



    
  
  return (
    <div className='bg-indigo-200  p-4 flex flex-col gap-y-2'>

      <div className='flex items-center'>
      <input type="text"    placeholder='  Type username to find someone'  onKeyDown={handleKey} value={username} onChange={(e)=>{setUsername(e.target.value);}}  className='w-full bg-white rounded-2xl p-1 pl-2' />
      <button className='bg-white p-1 rounded-r-xl hidden'>Search</button>
      </div>
      <div>
       
       {err && <div>User not found</div>}
       {user&& <div className=' flex gap-x-5 cursor-pointer items-center finduser p-2 rounded-2xl' onClick={handleSelect}>
        <img  className='w-10 ' src={user.photoURL} alt="ava" />
        <p className='capitalize'>{user.displayName}</p>
       </div> }
      </div>

    </div>
  )
}

export default Searchbar