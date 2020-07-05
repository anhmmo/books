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
      let value002 = event.target.value;
      let b = [...this.state.currentlyReading];
      let c = [...this.state.read];
      let d = [...this.state.wantToRead];

      let indexNumber = this.state.bookDataFromServer[index];
      const getResultNumber = (arr, indexNum, text) => {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === indexNum.id) {
            switch (text) {
              case "currentlyReading":
                return { text, i };
              case "read":
                return { text, i };
              case "wantToRead":
                return { text, i };
              default:
                return "";
            }
          }
        }
      };
      let art =
        getResultNumber(b, indexNumber, "currentlyReading") ||
        getResultNumber(d, indexNumber, "wantToRead") ||
        getResultNumber(c, indexNumber, "read");

      if (art) {
        this.setState({ selectedValue: value002 }, () => {
          switch (this.state.selectedValue) {
            case "currentlyReading":
              if (this.state.selectedValue === art.text) return;
              if ("read" === art.text) {
                let bb = [...this.state.currentlyReading];
                let cc = [...this.state.read];
                let uu = cc.splice(art.i, 1);

                uu[0].active = "currentlyReading";

                localStorage.setItem(
                  "currentlyReading",
                  JSON.stringify(bb.concat(uu))
                );
                localStorage.setItem("read", JSON.stringify(cc));
                this.setState({ read: cc, currentlyReading: bb.concat(uu) });
              }
              if ("wantToRead" === art.text) {
                let bb = [...this.state.currentlyReading];
                let cc = [...this.state.wantToRead];
                let uu = cc.splice(art.i, 1);

                uu[0].active = "currentlyReading";

                localStorage.setItem(
                  "currentlyReading",
                  JSON.stringify(bb.concat(uu))
                );
                localStorage.setItem("wantToRead", JSON.stringify(cc));
                this.setState({
                  wantToRead: cc,
                  currentlyReading: bb.concat(uu),
                });
              }
              break;
            case "wantToRead":
              if (this.state.selectedValue === art.text) return;
              if ("read" === art.text) {
                let bb = [...this.state.wantToRead];
                let cc = [...this.state.read];
                let uu = cc.splice(art.i, 1);

                uu[0].active = "wantToRead";

                localStorage.setItem(
                  "wantToRead",
                  JSON.stringify(bb.concat(uu))
                );
                localStorage.setItem("read", JSON.stringify(cc));
                this.setState({ read: cc, wantToRead: bb.concat(uu) });
              }
              if ("currentlyReading" === art.text) {
                let bb = [...this.state.wantToRead];
                let cc = [...this.state.currentlyReading];
                let uu = cc.splice(art.i, 1);

                uu[0].active = "wantToRead";

                localStorage.setItem(
                  "wantToRead",
                  JSON.stringify(bb.concat(uu))
                );
                localStorage.setItem("currentlyReading", JSON.stringify(cc));
                this.setState({
                  currentlyReading: cc,
                  wantToRead: bb.concat(uu),
                });
              }
              break;
            case "read":
              if (this.state.selectedValue === art.text) return;
              if ("wantToRead" === art.text) {
                let bb = [...this.state.read];
                let cc = [...this.state.wantToRead];
                let uu = cc.splice(art.i, 1);
                uu[0].active = "read";

                localStorage.setItem("read", JSON.stringify(bb.concat(uu)));
                localStorage.setItem("wantToRead", JSON.stringify(cc));
                this.setState({ wantToRead: cc, read: bb.concat(uu) });
              }
              if ("currentlyReading" === art.text) {
                let bb = [...this.state.read];
                let cc = [...this.state.currentlyReading];
                let uu = cc.splice(art.i, 1);
                uu[0].active = "read";

                localStorage.setItem("read", JSON.stringify(bb.concat(uu)));
                localStorage.setItem("currentlyReading", JSON.stringify(cc));
                this.setState({
                  currentlyReading: cc,
                  read: bb.concat(uu),
                });
              }
              break;
            case "none":
              if (this.state.selectedValue === art.text) return;
              if ("wantToRead" === art.text) {
                let cc = [...this.state.wantToRead];
                let uu = cc.splice(art.i, 1);
                uu[0].active = "move";

                localStorage.setItem("wantToRead", JSON.stringify(cc));
                this.setState({ wantToRead: cc });
              }
              if ("read" === art.text) {
                let cc = [...this.state.read];
                let uu = cc.splice(art.i, 1);
                uu[0].active = "move";

                localStorage.setItem("read", JSON.stringify(cc));
                this.setState({ read: cc });
              }
              if ("currentlyReading" === art.text) {
                let cc = [...this.state.currentlyReading];
                let uu = cc.splice(art.i, 1);
                uu[0].active = "move";

                localStorage.setItem("currentlyReading", JSON.stringify(cc));
                this.setState({ currentlyReading: cc });
              }
              break;
            default:
              break;
          }
        });
      } else {
        this.setState({ selectedValue: value002 }, () => {
          switch (this.state.selectedValue) {
            case "currentlyReading":
              let item = [...this.state.bookDataFromServer];
              let newItem = item.splice(index, 1);

              newItem[0].active = "currentlyReading";
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

              newItem2[0].active = "wantToRead";
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

              newItem3[0].active = "read";
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
      }
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
          if (mangMoi[j].id === this.state.bookDataFromServer[i].id) {
            indexN.push({ i, active: mangMoi[j].active });
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
