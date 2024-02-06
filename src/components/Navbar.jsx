import React from 'react'
import { IoIosStats } from "react-icons/io";
import { FaGear } from "react-icons/fa6";


const Navbar = () => {
  return (
    <nav className='nav-top'>
        <div className="nav-top-left"></div>
        <div className="nav-top-middle">
            <h2>Encrypto</h2>
        </div>   
        <div className="nav-top-right">
            <IoIosStats 
                className='nav-top-icon'
            />
            <FaGear 
                className='nav-top-icon' 
            />
        </div>     
        
    </nav>
  )
}

export default Navbar