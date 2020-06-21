import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import CurrentlyReading from "./components/CurrentlyReading";
import WantToRead from "./components/WantToRead";
import Read from "./components/Read";

import { currentlyReading, read, wantToRead } from "./data";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    currentlyReading: currentlyReading,
    read: read,
    wantToRead: wantToRead,
    showSearchPage: false,
    selectedValue: ""
  };

  render() {
    const getSelectedValue = (event, index) => {
      this.setState({ selectedValue: event.target.value }, () =>
        console.log(this.state.selectedValue, " ", index)
      );
    };
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading
                  currentlyReading={this.state.currentlyReading}
                  getSelectedValue={getSelectedValue}
                  selectedValue={this.state.selectedValue}
                />
                <WantToRead wantToRead={this.state.wantToRead} />
                <Read read={this.state.read} />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
