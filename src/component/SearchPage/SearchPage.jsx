import React, { Component, createRef } from "react";
import SearchInput from "./SearchInput/SearchInput";
import ListBook from "./ListBook/ListBook";
import {
  currentlyReading,
  read,
  wantToRead,
} from "../HomePage/DataSample/Data";

class SearchPage extends Component {
  timeOutRef = createRef();
  constructor() {
    super();
    this.state = {
      bookDataFromServer: [],
      disableIndex: [],
      currentlyReading:
        JSON.parse(localStorage.getItem("currentlyReading")) ||
        currentlyReading,
      read: JSON.parse(localStorage.getItem("read")) || read,
      wantToRead: JSON.parse(localStorage.getItem("wantToRead")) || wantToRead,
      selectedValue: "",
      noResult: false,
    };
  }
  render() {
    const seachInputChange = (result) => {
      this.setState({ bookDataFromServer: result.books }, () => {
        this.state.bookDataFromServer instanceof Array
          ? console.log(this.state.bookDataFromServer)
          : this.setState({ noResult: true });
      });
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
              disableIndex: this.state.disableIndex.concat(index),
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
              disableIndex: this.state.disableIndex.concat(index),
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
              disableIndex: this.state.disableIndex.concat(index),
            });
            break;
          default:
            break;
        }
      });
    };

    const searchInput = (event) => {
      const value = event.target.value.toLowerCase();

      if (this.timeOutRef.current) {
        clearTimeout(this.timeOutRef.current);
      }

      this.timeOutRef.current = setTimeout(() => {
        if (value.length === 0) {
          return seachInputChange([]);
        }

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

    let mangMoi = [];
    let indexN = [];

    if (
      typeof this.state.wantToRead !== "undefined" &&
      typeof this.state.currentlyReading !== "undefined" &&
      typeof this.state.read !== "undefined" &&
      typeof this.state.bookDataFromServer !== "undefined"
    ) {
      mangMoi = [
        ...this.state.wantToRead,
        ...this.state.read,
        ...this.state.currentlyReading,
      ];

      for (let i = 0; i < this.state.bookDataFromServer.length; i++) {
        for (let j = 0; j < mangMoi.length; j++) {
          let authors1 = mangMoi[j].hasOwnProperty("authors")
            ? mangMoi[j].authors[0]
            : " ";
          let authors2 = this.state.bookDataFromServer[i].hasOwnProperty(
            "authors"
          )
            ? this.state.bookDataFromServer[i].authors[0]
            : " ";
          if (
            mangMoi[j].title === this.state.bookDataFromServer[i].title &&
            authors1 === authors2
          ) {
            indexN.push(i);
          }
        }
      }
    }

    return (
      <div className="search-books">
        <SearchInput searchInput={searchInput} />
        <ListBook
          moveOutFromServer={moveOutFromServer}
          bookDataFromServer={this.state.bookDataFromServer}
          indexN={indexN}
          noResult={this.state.noResult}
        />
      </div>
    );
  }
}

export default SearchPage;
