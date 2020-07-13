import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import "./SearchInput.scss";

import LastSearch from "Components/LastSearch/LastSearch";

const SearchInput = ({
  clearBooksResult,
  onUpdateBook,
  onSearchBooks,
  message,
  booksResult = [],
  lastSearch,
}) => {
  const [isEditing, setEditing] = useState(false);
  const toggleEditing = () => {
    setEditing(!isEditing);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" onClick={clearBooksResult}></Link>
        <div className="search-books-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by title or author"
            onChange={(event) => onSearchBooks(event.target.value)}
            autoFocus={true}
          />
        </div>
      </div>
      <div className="search-books-results">
        <LastSearch
          message={message}
          booksResult={booksResult}
          onUpdateBook={onUpdateBook}
          lastSearch={lastSearch}
          toggleEditing={toggleEditing}
        />
      </div>
    </div>
  );
};

SearchInput.defaultProps = {
  message: "Enter the title or actor you want to search, in the field above.",
};

SearchInput.propTypes = {
  booksResult: PropTypes.array,
  message: PropTypes.string,
  onSearchBooks: PropTypes.func.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
  clearBooksResult: PropTypes.func.isRequired,
};

export default SearchInput;
