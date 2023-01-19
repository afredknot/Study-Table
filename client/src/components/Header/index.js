import React, { useState } from 'react';
import "./style.css";

const Header = ({title}) => {

  // const [searchValue, setSearchValue] = useState('');

  // const handleSearch = (e) => {
  //   setSearchValue(e.target.value);
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(`Searching for: ${searchValue}`);
  //   // MAKE QUERY HERE
  // }
  
      // <form onSubmit={handleSubmit}>
      //   <input type="text" value={searchValue} onChange={handleSearch} placeholder="Search..."/>
      //   <button type="submit">Search</button>
      // </form>

  return (
    <header>
      <h1 className ="pageTitle">PASS IN HERE</h1>
    </header>
  );
}

export default Header;