import React from 'react'
import { FaArrowRight } from "react-icons/fa";

const Swap = ({ selectedInput, setSelectedInput, swapInput }) => {


  return (
    <div
      className='swap-container'
      onClick={()=>setSelectedInput('swap')}
      style ={{ 
        //border: selectedInput==='swap' ? "blue 1px solid" : null 
    }}>
      <div className={`swap-0 box ${selectedInput === 'swap' && swapInput[0] ? 'animate' : 'no-animate'}`}>
        <p>{swapInput[0]}</p>
      </div>
      <FaArrowRight className='swap-arrow-icon'/>
      <div className={`swap-1 box ${selectedInput === 'swap' && swapInput[1] ? 'animate' : 'no-animate'}`}>
        <p>{swapInput[1]}</p>
      </div>
    </div>
  )
}

export default Swap