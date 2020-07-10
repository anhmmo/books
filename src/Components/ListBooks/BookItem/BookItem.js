import React from "react";
import PropTypes from "prop-types";

import "./BookItem.scss";
import Book from "../Book/Book";

const BookItem = ({ classname, title, books, onUpdateBook }) => (
  <div className="bookshelf">
    <h2 className={`bookshelf-title ${classname}`}>
      {`${title}`}
      <span className="item-number">
        {books.length <= 1
          ? ` (${books.length} item)`
          : ` (${books.length} items)`}
      </span>
    </h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book, index) => (
          <li key={index}>
            <Book book={book} onUpdateBook={onUpdateBook} />
          </li>
        ))}
      </ol>
    </div>
  </div>
);

BookItem.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      shelf: PropTypes.string.isRequired,
    })
  ),
  onUpdateBook: PropTypes.func.isRequired,
};

export default BookItem;
