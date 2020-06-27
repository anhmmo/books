import React from "react";
import { Link } from "react-router-dom";

function SearchInput(props) {
  const { searchInput } = props;
  return (
    <div className="search-books-bar">
      <Link to="/">
        <button className="close-search">Close</button>
      </Link>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          onChange={(event) => searchInput(event)}
          placeholder="Search by title or author"
        />
      </div>
    </div>
  );
}

export default SearchInput;
