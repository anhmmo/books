import React from "react";

function ListBook(props) {
  const { bookDataFromServer, indexN, moveOutFromServer, noResult } = props;

  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {typeof bookDataFromServer !== "undefined" &&
        bookDataFromServer.length > 0 ? (
          bookDataFromServer.map((book, index) => (
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
                      style={
                        indexN.includes(index)
                          ? {
                              filter: "grayscale(1)",
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${
                                book.hasOwnProperty("imageLinks")
                                  ? book.imageLinks.thumbnail
                                  : "https://filmi.netlify.app/static/media/no_image.31f5bb1d.jpg"
                              })`,
                            }
                          : {
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${
                                book.hasOwnProperty("imageLinks")
                                  ? book.imageLinks.thumbnail
                                  : "https://filmi.netlify.app/static/media/no_image.31f5bb1d.jpg"
                              })`,
                            }
                      }
                    />
                    <div
                      style={
                        indexN.includes(index)
                          ? { backgroundColor: "gray" }
                          : {}
                      }
                      className="book-shelf-changer"
                    >
                      <select
                        disabled={indexN.includes(index)}
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
          ))
        ) : (
          <div>{noResult ? "no result" : ""}</div>
        )}
      </ol>
    </div>
  );
}

export default ListBook;
