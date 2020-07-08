import React from "react";
import PropTypes from "prop-types";

import BookshelfChanger from "../BookshelfChanger/BookshelfChanger";

import "./Book.css";

const Book = ({ book, onUpdateBook }) => {
  const handleBookshelfChanger = (shelf) => {
    onUpdateBook({ ...book, shelf });
  };
  const { title, shelf, authors = [], imageLinks } = book;
  const bookCoverStyle = { width: 128, height: 193, backgroundColor: "#ccc" };

  if (imageLinks) {
    delete bookCoverStyle.backgroundColor;
    bookCoverStyle.backgroundImage = `url("${imageLinks.thumbnail}")`;
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={bookCoverStyle} />
        <BookshelfChanger
          shelf={shelf}
          onChangeOption={handleBookshelfChanger}
        />
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">
        {authors.map((author) => (
          <span key={author}>{author}</span>
        ))}
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};

export default Book;
