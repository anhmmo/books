import React from "react";
import { Link } from "react-router-dom";

function SearchButton(props) {
  return (
    <Link to="/search">
      <div className="open-search">
        <button style={{ cursor: "pointer" }}>Add a book</button>
      </div>
    </Link>
  );
}

export default SearchButton;
