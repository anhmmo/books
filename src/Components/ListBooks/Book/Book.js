import React from "react";
import PropTypes from "prop-types";

import images from "Assets/Images/no_image.jpg";
import "./Book.scss";
import BookSelectButton from "../BookSelectButton/BookSelectButton";

const Book = ({ book, onUpdateBook }) => {
  const { title, shelf, authors = [], imageLinks } = book;
  const bookCoverStyle = {
    width: 128,
    height: 193,
  };

  if (imageLinks) {
    bookCoverStyle.backgroundImage = `url("${imageLinks.thumbnail}")`;
  } else {
    bookCoverStyle.backgroundSize = "cover";
    bookCoverStyle.backgroundImage = `url(${images})`;
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={bookCoverStyle} />
        <BookSelectButton
          shelf={shelf}
          onChangeOption={onUpdateBook}
          book={book}
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
