import React from 'react'
import { FaSearch } from 'react-icons/fa';
import "./SearchBar.scss"

const SearchBar = () => {
  return (
    <div className='seachbar-container'>
        <input type='text' className='search-bar' placeholder='Search here...'/>
        <FaSearch size={15} color="#293747" className='search-icon' />
    </div>
  )
}

export default SearchBar