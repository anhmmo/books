import React from "react";

import PropTypes from "prop-types";

import If from "Utils/If";
import Book from "Components/ListBooks/Book/Book";

function LastSearch({ message, booksResult, onUpdateBook }) {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

LastSearch.defaultProps = {
  message: "Enter the title or actor you want to search, in the field above.",
};

LastSearch.propTypes = {
  message: PropTypes.string,
};

export default LastSearch;
