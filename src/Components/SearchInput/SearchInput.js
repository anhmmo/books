import React from "react";
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
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" onClick={clearBooksResult}></Link>
        <div className="search-books-input-wrapper">
          <input
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
