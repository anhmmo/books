import React, { Component } from "react";
import PropTypes from "prop-types";

import "./BookSelectButton.scss";
import TypeFilter from "Utils/TypeFilter";

class BookSelectButton extends Component {
  render() {
    const { shelf, onChangeOption, book } = this.props;

    let colorChange,
      colorChange2 = "defaultSelect";
    if (shelf === "currentlyReading") {
      colorChange = "greenColor";
      colorChange2 = "greenSelect";
    }
    if (shelf === "wantToRead") {
      colorChange = "redColor";
      colorChange2 = "redSelect";
    }
    if (shelf === "read") {
      colorChange = "orangeColor";
      colorChange2 = "orangeSelect";
    }

    return (
      <div className={`book-shelf-changer ${colorChange}`}>
        <i className="fas fa-caret-down"></i>
        <select
          className={colorChange2}
          value={shelf}
          onChange={(event) => onChangeOption(book, event.target.value)}
        >
          <option style={{ color: "black" }} disabled>
            Move to...
          </option>
          {TypeFilter.map((shelf) => (
            <option key={shelf.type} value={shelf.type}>
              {shelf.label}
            </option>
          ))}
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

BookSelectButton.defaultProps = {
  shelf: "none",
};

BookSelectButton.propTypes = {
  shelf: PropTypes.string,
  onChangeOption: PropTypes.func.isRequired,
};

export default BookSelectButton;
