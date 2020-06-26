import React from "react";
import "./App.scss";

import {
  currentlyReading,
  read,
  wantToRead
} from "./components/HomePage/SampleData/Data";
import SearchBox from "./components/HomePage/SearchPage/SearchBox";
import HomePage from "./components/HomePage/HomePage";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentlyReading:
        JSON.parse(localStorage.getItem("currentlyReading")) ||
        currentlyReading,
      read: JSON.parse(localStorage.getItem("read")) || read,
      wantToRead: JSON.parse(localStorage.getItem("wantToRead")) || wantToRead,
      showSearchPage: false,
      bookDataFromServer: [],
      disableIndex: []
    };
  }

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
            localStorage.setItem(
              "currentlyReading",
              JSON.stringify(newArray.concat(newItem))
            );

            this.setState({
              currentlyReading: newArray.concat(newItem),
              selectedValue: "",
              disableIndex: this.state.disableIndex.concat(index)
            });
            break;
          case "wantToRead":
            let item2 = [...this.state.bookDataFromServer];
            let newItem2 = item2.splice(index, 1);
            let newArray2 = [...this.state.wantToRead];
            localStorage.setItem(
              "wantToRead",
              JSON.stringify(newArray2.concat(newItem2))
            );

            this.setState({
              wantToRead: newArray2.concat(newItem2),
              selectedValue: "",
              disableIndex: this.state.disableIndex.concat(index)
            });
            break;
          case "read":
            let item3 = [...this.state.bookDataFromServer];
            let newItem3 = item3.splice(index, 1);
            let newArray3 = [...this.state.read];

            localStorage.setItem(
              "read",
              JSON.stringify(newArray3.concat(newItem3))
            );

            this.setState({
              read: newArray3.concat(newItem3),
              selectedValue: "",
              disableIndex: this.state.disableIndex.concat(index)
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
            localStorage.setItem("currentlyReading", JSON.stringify(item));
            localStorage.setItem(
              "wantToRead",
              JSON.stringify(newArray.concat(newItem))
            );
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
            localStorage.setItem("currentlyReading", JSON.stringify(item2));
            localStorage.setItem(
              "read",
              JSON.stringify(newArray2.concat(newItem2))
            );

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
            localStorage.setItem("wantToRead", JSON.stringify(item));
            localStorage.setItem(
              "read",
              JSON.stringify(newArray.concat(newItem))
            );

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
            localStorage.setItem("wantToRead", JSON.stringify(item2));
            localStorage.setItem(
              "currentlyReading",
              JSON.stringify(newArray2.concat(newItem2))
            );

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
            localStorage.setItem("read", JSON.stringify(item));
            localStorage.setItem(
              "wantToRead",
              JSON.stringify(newArray.concat(newItem))
            );

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
            localStorage.setItem("read", JSON.stringify(item2));
            localStorage.setItem(
              "currentlyReading",
              JSON.stringify(newArray2.concat(newItem2))
            );

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
            currentlyReading={this.state.currentlyReading}
            read={this.state.read}
            wantToRead={this.state.wantToRead}
          />
        ) : (
          <HomePage
            moveOutFromCurrentlyReading={moveOutFromCurrentlyReading}
            moveOutFromWantToRead={moveOutFromWantToRead}
            moveOutFromRead={moveOutFromRead}
            currentlyReading={this.state.currentlyReading}
            read={this.state.read}
            wantToRead={this.state.wantToRead}
          />
        )}
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>
            Add a book
          </button>
        </div>
      </div>
    );
  }
}

export default App;
