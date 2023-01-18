import React from "react";

const ClassSelector = ({icon, name, handleClassSelect}) => {

  return (
    <div onClick={handleClassSelect}>
      <img src={icon} alt={name} Icon></img>
      <h2>{name}</h2>
    </div>
  );
}

export default ClassSelector;