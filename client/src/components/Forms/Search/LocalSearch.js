import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <input
      type="search"
      placeholder="Filter"
      value={keyword}
      onChange={handleSearchChange}
    />
  );
};

export default LocalSearch;
