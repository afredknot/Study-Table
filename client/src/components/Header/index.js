import React, { useState } from 'react';

const Header = ({title}) => {

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchValue}`);
    // MAKE QUERY HERE
  }
  
  return (
    <header>
      <h1 className ="col-3">{title}</h1>
      
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchValue} onChange={handleSearch} placeholder="Search..."/>
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

export default Header;