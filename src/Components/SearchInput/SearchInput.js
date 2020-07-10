import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Debounce } from "react-throttle";

import "./SearchInput.scss";
import Book from "Components/ListBooks/Book/Book";
import If from "Utils/If";

const SearchBooks = ({
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
        <Link className="close-search" to="/" onClick={clearBooksResult}>
          Close
        </Link>
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
        <If test={message}>
          <p align="center">{message}</p>
        </If>
        <ol className="books-grid">
          {booksResult.map((book, index) => (
            <li key={index}>
              <Book book={book} onUpdateBook={onUpdateBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

SearchBooks.defaultProps = {
  message: "Enter the title or actor you want to search, in the field above.",
};

SearchBooks.propTypes = {
  booksResult: PropTypes.array,
  message: PropTypes.string,
  onSearchBooks: PropTypes.func.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
  clearBooksResult: PropTypes.func.isRequired,
};

export default SearchBooks;
