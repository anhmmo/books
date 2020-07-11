import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import "./ListBooks.scss";
import BookItem from "./BookItem/BookItem";
import Loading from "Components/Loading/Loading";
import TypeFilter from "Utils/TypeFilter";

const ListBooks = ({ books = [], onUpdateBook }) => (
  <div className="list-books">
    <div className="list-books-content">
      {books.length ? (
        TypeFilter.map(({ type, label }) => (
          <React.Fragment key={type}>
            <BookItem
              title={label}
              books={books.filter((book) => book.shelf === type)}
              onUpdateBook={onUpdateBook}
              classname={type}
            />
            <div className="open-search">
              <Link to="/search"></Link>
            </div>
          </React.Fragment>
        ))
      ) : (
        <Loading />
      )}
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
