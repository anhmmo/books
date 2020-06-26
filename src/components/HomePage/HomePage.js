import React, { Component } from "react";
import CurrentlyReading from "./CurrentlyReading/CurrentlyReading";
import WantToRead from "./WantToRead/WantToRead";
import Read from "./Read/Read";

class HomePage extends Component {
  render() {
    const {
      moveOutFromCurrentlyReading,
      moveOutFromWantToRead,
      moveOutFromRead,
      currentlyReading,
      read,
      wantToRead
    } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <CurrentlyReading
              currentlyReading={currentlyReading}
              moveOutFromCurrentlyReading={moveOutFromCurrentlyReading}
            />
            <WantToRead
              wantToRead={wantToRead}
              moveOutFromWantToRead={moveOutFromWantToRead}
            />
            <Read read={read} moveOutFromRead={moveOutFromRead} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
