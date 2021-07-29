import { useState, useEffect } from "react";
import { faSearch, FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ResearchBar = ({ handleSearch }) => {
  return (
    <div className="searchbar">
      <FontAwesomeIcon icon="search" className="searchicon" />
      <input
        type="text"
        placeholder="Recherche des articles"
        onChange={handleSearch}
      />
    </div>
  );
};

export default ResearchBar;
