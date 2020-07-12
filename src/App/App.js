import React, { createRef } from "react";
import { Route, Switch } from "react-router-dom";

import * as BooksAPI from "Services/BooksAPI";
import ListBooks from "Components/ListBooks/ListBooks";
import SearchInput from "Components/SearchInput/SearchInput";
import NotFound from "Components/404/404";

import "./App.scss";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      booksResult: [],
      searchMessage: undefined,
      lastSearch: JSON.parse(localStorage.getItem("lastSearch")) || [],
    };
    this.inputRef = createRef();
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ books }));
  }

  updateBooksState(book) {
    const { books } = this.state;

    const SHELF_NONE = "none";
    const storagedBook = books.find((bookItem) => bookItem.id === book.id);

    const prevShelf = storagedBook ? storagedBook.shelf : SHELF_NONE;

    if (prevShelf !== SHELF_NONE) {
      const storagedBookIndex = books.findIndex(
        (storagedBook) => storagedBook.id === book.id
      );
      books.splice(storagedBookIndex, 1);
    }

    if (book.shelf !== SHELF_NONE) {
      books.push(book);
    }

    this.setState({ books });
  }

  updateBooksResultState(book) {
    const { booksResult } = this.state;
    console.log(booksResult);
    if (!booksResult || !booksResult.length) {
      return;
    }

    const resultBookIndex = booksResult.findIndex(
      (resultBook) => resultBook.id === book.id
    );
    booksResult[resultBookIndex] = book;

    this.setState({ booksResult });
  }

  handleUpdateBook = (book, shelf) => {
    book = { ...book, shelf };

    BooksAPI.update(book, book.shelf);
    this.updateBooksState(book);
    this.updateBooksResultState(book);
  };

  handleSearchBooks = (query) => {
    if (this.inputRef.current) {
      clearTimeout(this.inputRef.current);
    }
    this.inputRef.current = setTimeout(() => {
      this.searchBooks(query);
    }, 400);
  };

  searchBooks(query) {
    if (!query) {
      this.setState({ booksResult: [], searchMessage: undefined });
      return;
    }

    BooksAPI.search(query).then((response) => {
      if (response.error) {
        this.setState({ booksResult: [], searchMessage: "No books" });
        return;
      }

      let queryArray = [...this.state.lastSearch];
      queryArray.push(query);
      localStorage.setItem("lastSearch", JSON.stringify(queryArray));
      this.setState({ lastSearch: queryArray });

      let booksResult = response;
      const { books } = this.state;

      if (booksResult && Array.isArray(booksResult)) {
        booksResult = booksResult.map((book) => {
          return (
            books.find((storagedBook) => storagedBook.id === book.id) || book
          );
        });
      }

      this.setState({ booksResult, searchMessage: "" });
    });
  }

  handleClearBooksResult = () => {
    this.setState({ booksResult: [], searchMessage: undefined });
  };

  render() {
    const { books, booksResult, searchMessage, lastSearch } = this.state;

    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <ListBooks books={books} onUpdateBook={this.handleUpdateBook} />
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <SearchInput
                booksResult={booksResult}
                message={searchMessage}
                onSearchBooks={this.handleSearchBooks}
                onUpdateBook={this.handleUpdateBook}
                clearBooksResult={this.handleClearBooksResult}
                lastSearch={lastSearch}
              />
            )}
          />
          <Route
            path=""
            render={() => (
              <NotFound
                notFoundText="page"
                searchText="Back To Home"
                path="/"
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
