import React from "react";

import PropTypes from "prop-types";

import If from "Utils/If";
import Book from "Components/ListBooks/Book/Book";
import NotFound from "Components/404/404";

function LastSearch({ message, booksResult, onUpdateBook, lastSearch = [] }) {
  return (
    <React.Fragment>
      <If test={message}>
        {message.includes("No books") ? (
          <NotFound
            notFoundText="book"
            searchText="Search Again !"
            path="/search"
          />
        ) : (
          <div align="center">
            {lastSearch.length > 0
              ? lastSearch.map((item, index) => <div key={index}>{item}</div>)
              : message}
          </div>
        )}
      </If>
      <ol className="books-grid">
        {booksResult.map((book, index) => (
          <li key={index}>
            <Book book={book} onUpdateBook={onUpdateBook} />
          </li>
        ))}
      </ol>
    </React.Fragment>
  );
}

LastSearch.defaultProps = {
  message: "There are not searching history yet, please search new one",
};

LastSearch.propTypes = {
  message: PropTypes.string,
};

export default LastSearch;
