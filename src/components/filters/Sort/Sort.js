import React from 'react'
import "./Sort.scss"
import { IoIosArrowDown } from 'react-icons/io'

const Sort = () => {
  return (
    <div className='sort-container'>
        <p>Filter</p>
        <IoIosArrowDown size={18}  />
    </div>
  )
}

export default Sort