import React from 'react'
import Header from './Header'
import Searchbar from './Searchbar'
import Chats from './Chats'



const Sidebar = ({togglePage}) => {


 

  return (
    <div className=' bg-indigo-300 w-1/3 flex flex-col '>
        <Header togglePage={() => togglePage()} />
        <Searchbar />
        <Chats/>
    </div>
  )
}

export default Sidebar