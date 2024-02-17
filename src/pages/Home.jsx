import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Chatside from '../components/Chatside'


const Home = () => {

  const [pageSize, setPageSize] = useState(false);

  const handleChange = () => {
    setPageSize(prev => !prev)
  }

  return (
    <div className='px-40 py-20 bg-indigo-50 h-screen flex font' style={!pageSize ? { padding: "5rem 10rem" } : { padding: "0 0" }} >
      <Sidebar togglePage={handleChange} />
      <Chatside />
    </div>
  )
}

export default Home