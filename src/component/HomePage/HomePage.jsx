import React, { Component } from "react";
import { currentlyReading, read, wantToRead } from "./DataSample/Data";
import CurrentlyReading from "./CurrentlyReading/CurrentlyReading";
import Read from "./Read/Read";
import WantToRead from "./WantToRead/WantToRead";
import Heading from "./Heading/Heading";
import SearchButton from "./SearchButton/SearchButton";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      currentlyReading:
        JSON.parse(localStorage.getItem("currentlyReading")) ||
        currentlyReading,
      read: JSON.parse(localStorage.getItem("read")) || read,
      wantToRead: JSON.parse(localStorage.getItem("wantToRead")) || wantToRead,
    };
  }
  render() {
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
              selectedValue: "",
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
              selectedValue: "",
            });
            break;
          case "none":
            let item3 = [...this.state.currentlyReading];
            item3.splice(index, 1);
            localStorage.setItem("currentlyReading", JSON.stringify(item3));
            this.setState({
              currentlyReading: item3,
              selectedValue: "",
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
              selectedValue: "",
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
              selectedValue: "",
            });
            break;
          case "none":
            let item3 = [...this.state.wantToRead];
            item3.splice(index, 1);
            localStorage.setItem("wantToRead", JSON.stringify(item3));
            this.setState({
              wantToRead: item3,
              selectedValue: "",
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
              selectedValue: "",
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
              selectedValue: "",
            });
            break;
          case "none":
            let item3 = [...this.state.read];
            item3.splice(index, 1);
            localStorage.setItem("read", JSON.stringify(item3));
            this.setState({
              read: item3,
              selectedValue: "",
            });
            break;
          default:
            break;
        }
      });
    };
    return (
      <div className="list-books">
        <Heading />
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
            <Read read={this.state.read} moveOutFromRead={moveOutFromRead} />
          </div>
        </div>
        <SearchButton />
      </div>
    );
  }
}

export default HomePage;
