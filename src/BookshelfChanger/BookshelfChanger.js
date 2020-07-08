import React, { Component } from "react";
import PropTypes from "prop-types";

import shelves from "../commons/shelves";

import "./BookshelfChanger.css";

class BookshelfChanger extends Component {
  handleChangeSelect = (event) => {
    const { onChangeOption } = this.props;
    onChangeOption(event.target.value);
  };

  render() {
    const { shelf } = this.props;

    return (
      <div className="book-shelf-changer">
        <select value={shelf} onChange={this.handleChangeSelect}>
          <option disabled>Move to...</option>
          {shelves.map((shelf) => (
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

BookshelfChanger.defaultProps = {
  shelf: "none",
};

BookshelfChanger.propTypes = {
  shelf: PropTypes.string,
  onChangeOption: PropTypes.func.isRequired,
};

export default BookshelfChanger;
