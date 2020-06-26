import React from "react";
import PropTypes from "prop-types";

CurrentlyReading.propTypes = {
  currentlyReading: PropTypes.array.isRequired
};

function CurrentlyReading({ currentlyReading, moveOutFromCurrentlyReading }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {currentlyReading.map((book, index) => (
            <React.Fragment key={index}>
              <li>
                <div className="book">
                  <div className="book-top">
                    <div
                      className={
                        book.hasOwnProperty("imageLinks")
                          ? "book-cover"
                          : "image-notfound"
                      }
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${
                          book.hasOwnProperty("imageLinks")
                            ? book.imageLinks.thumbnail
                            : "https://filmi.netlify.app/static/media/no_image.31f5bb1d.jpg"
                        })`
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        value="currentlyReading"
                        onChange={event =>
                          moveOutFromCurrentlyReading(event, index)
                        }
                      >
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading" disabled>
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            </React.Fragment>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default CurrentlyReading;
