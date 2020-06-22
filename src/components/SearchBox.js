import React, { useRef } from "react";
import PropTypes from "prop-types";

SearchBox.propTypes = {
  closeSearchBox: PropTypes.func,
  seachInputChange: PropTypes.func,
  bookDataFromServer: PropTypes.array,
};

function SearchBox({
  closeSearchBox,
  seachInputChange,
  bookDataFromServer = [],
  moveOutFromServer,
  disableIndex,
}) {
  const timeOutRef = useRef(null);

  const searchInput = (event) => {
    const value = event.target.value.toLowerCase();

    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }

    timeOutRef.current = setTimeout(() => {
      if (value.length === 0) return seachInputChange([]);

      fetch("https://reactnd-books-api.udacity.com/search", {
        method: "POST",
        headers: {
          Authorization: "whatever-you-want",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: value }),
      })
        .then((response) => response.json())
        .then((result) => seachInputChange(result))
        .catch((error) => console.log("error", error));
    }, 300);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => closeSearchBox()}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={(event) => searchInput(event)}
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {bookDataFromServer.length > 0 &&
            bookDataFromServer.map((book, index) => (
              <React.Fragment key={index}>
                <li>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.imageLinks.thumbnail})`,
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select
                          disabled={disableIndex === index ? true : false}
                          value="move"
                          onChange={(event) => moveOutFromServer(event, index)}
                        >
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

export default SearchBox;
