import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import CurrentlyReading from "./components/CurrentlyReading";
import WantToRead from "./components/WantToRead";
import Read from "./components/Read";

import { currentlyReading, read, wantToRead } from "./data";
import SearchBox from "./components/SearchBox";

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
    bookDataFromServer: [],
    disableIndex: Number.NEGATIVE_INFINITY
  };

  render() {
    const closeSearchBox = () => {
      this.setState({ showSearchPage: false });
    };

    const seachInputChange = result => {
      this.setState({ bookDataFromServer: result.books });
    };

    const moveOutFromServer = (event, index) => {
      this.setState({ selectedValue: event.target.value }, () => {
        switch (this.state.selectedValue) {
          case "currentlyReading":
            let item = [...this.state.bookDataFromServer];
            let newItem = item.splice(index, 1);
            let newArray = [...this.state.currentlyReading];

            this.setState({
              currentlyReading: newArray.concat(newItem),
              selectedValue: "",
              disableIndex: index
            });
            break;
          case "wantToRead":
            let item2 = [...this.state.bookDataFromServer];
            let newItem2 = item2.splice(index, 1);
            let newArray2 = [...this.state.wantToRead];

            this.setState({
              wantToRead: newArray2.concat(newItem2),
              selectedValue: "",
              disableIndex: index
            });
            break;
          case "read":
            let item3 = [...this.state.bookDataFromServer];
            let newItem3 = item3.splice(index, 1);
            let newArray3 = [...this.state.read];

            this.setState({
              read: newArray3.concat(newItem3),
              selectedValue: "",
              disableIndex: index
            });
            break;
          default:
            break;
        }
      });
    };

    const moveOutFromCurrentlyReading = (event, index) => {
      this.setState({ selectedValue: event.target.value }, () => {
        switch (this.state.selectedValue) {
          case "wantToRead":
            let item = [...this.state.currentlyReading];
            let newItem = item.splice(index, 1);
            let newArray = [...this.state.wantToRead];

            this.setState({
              currentlyReading: item,
              wantToRead: newArray.concat(newItem),
              selectedValue: ""
            });
            break;
          case "read":
            let item2 = [...this.state.currentlyReading];
            let newItem2 = item2.splice(index, 1);
            let newArray2 = [...this.state.read];

            this.setState({
              currentlyReading: item2,
              read: newArray2.concat(newItem2),
              selectedValue: ""
            });
            break;
          default:
            break;
        }
      });
    };

    const moveOutFromWantToRead = (event, index) => {
      this.setState({ selectedValue: event.target.value }, () => {
        switch (this.state.selectedValue) {
          case "read":
            let item = [...this.state.wantToRead];
            let newItem = item.splice(index, 1);
            let newArray = [...this.state.read];

            this.setState({
              wantToRead: item,
              read: newArray.concat(newItem),
              selectedValue: ""
            });
            break;
          case "currentlyReading":
            let item2 = [...this.state.wantToRead];
            let newItem2 = item2.splice(index, 1);
            let newArray2 = [...this.state.currentlyReading];

            this.setState({
              wantToRead: item2,
              currentlyReading: newArray2.concat(newItem2),
              selectedValue: ""
            });
            break;
          default:
            break;
        }
      });
    };

    const moveOutFromRead = (event, index) => {
      this.setState({ selectedValue: event.target.value }, () => {
        switch (this.state.selectedValue) {
          case "wantToRead":
            let item = [...this.state.read];
            let newItem = item.splice(index, 1);
            let newArray = [...this.state.wantToRead];

            this.setState({
              read: item,
              wantToRead: newArray.concat(newItem),
              selectedValue: ""
            });
            break;
          case "currentlyReading":
            let item2 = [...this.state.read];
            let newItem2 = item2.splice(index, 1);
            let newArray2 = [...this.state.currentlyReading];

            this.setState({
              read: item2,
              currentlyReading: newArray2.concat(newItem2),
              selectedValue: ""
            });
            break;
          default:
            break;
        }
      });
    };

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBox
            closeSearchBox={closeSearchBox}
            seachInputChange={seachInputChange}
            bookDataFromServer={this.state.bookDataFromServer}
            moveOutFromServer={moveOutFromServer}
            disableIndex={this.state.disableIndex}
          />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading
                  currentlyReading={this.state.currentlyReading}
                  moveOutFromCurrentlyReading={moveOutFromCurrentlyReading}
                />
                <WantToRead
                  wantToRead={this.state.wantToRead}
                  moveOutFromWantToRead={moveOutFromWantToRead}
                />
                <Read
                  read={this.state.read}
                  moveOutFromRead={moveOutFromRead}
                />
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
