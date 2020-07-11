import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Debounce } from "react-throttle";

import "./SearchInput.scss";

import LastSearch from "Components/LastSearch/LastSearch";

const SearchInput = ({
  clearBooksResult,
  onUpdateBook,
  onSearchBooks,
  message,
  booksResult = [],
}) => {
  const handleChangeSearchInput = ({ target }) => {
    const query = target.value;
    onSearchBooks(query);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" onClick={clearBooksResult}></Link>
        <div className="search-books-input-wrapper">
          <Debounce time="200" handler="onChange">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={handleChangeSearchInput}
              autoFocus={true}
            />
          </Debounce>
        </div>
      </div>
      <div className="search-books-results">
        <LastSearch
          message={message}
          booksResult={booksResult}
          onUpdateBook={onUpdateBook}
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
