import React, { useState} from 'react'


import Chat from './Chat';

// import Profile from './Profile';

const Chatside = () => {

  // const [page,setPage] = useState(true);
  
  const handlePage = () =>{
    // setPage(prev => !prev)
  }

  return (
    <>

    {/* {page ? */}
    <Chat onClick={handlePage} />
     {/* :
    <Profile onClick={handlePage}/>
    }
       */}




    </>
  )
}

export default Chatside