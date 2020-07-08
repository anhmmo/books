import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import shelves from "../commons/shelves";
import Bookshelf from "../Bookshelf/Bookshelf";

import "./ListBooks.css";

const ListBooks = ({ books = [], onUpdateBook }) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      {books.length ? (
        shelves.map(({ type, label }) => (
          <Bookshelf
            key={type}
            title={label}
            books={books.filter((book) => book.shelf === type)}
            onUpdateBook={onUpdateBook}
          />
        ))
      ) : (
        <p align="center">Loading books...</p>
      )}
    </div>
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>
);

ListBooks.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      shelf: PropTypes.string.isRequired,
    })
  ),
  onUpdateBook: PropTypes.func.isRequired,
};

export default ListBooks;
