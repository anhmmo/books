import React from "react";
import PropTypes from "prop-types";

WantToRead.propTypes = {
  wantToRead: PropTypes.array.isRequired
};

function WantToRead({ wantToRead }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Want to Read</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {wantToRead.map((book, index) => (
            <React.Fragment key={index}>
              {" "}
              <li>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 192,
                        backgroundImage: `url(${book.images})`
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select>
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.name}</div>
                  <div className="book-authors">{book.author}</div>
                </div>
              </li>
            </React.Fragment>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default WantToRead;
