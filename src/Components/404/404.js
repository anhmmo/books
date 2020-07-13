import React from "react";

import "./404.scss";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
  constructor() {
    super();
    this.state = {
      firstDigit: 4,
      secondDigit: 0,
      thirstDigit: 4,
      display: false,
    };
  }

  getRandomNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber);
  }

  componentDidMount() {
    this.setTime = setInterval(() => {
      this.setState({
        firstDigit: this.getRandomNumber(5),
        secondDigit: this.getRandomNumber(2),
        thirstDigit: this.getRandomNumber(5),
      });
      if (
        this.state.firstDigit === 4 &&
        this.state.secondDigit === 0 &&
        this.state.thirstDigit === 4
      ) {
        this.setState({ display: true });
        clearInterval(this.setTime);
      }
    }, 100);
  }

  componentWillUnmount() {
    if (this.setTime) clearInterval(this.setTime);
  }

  render() {
    const {
      notFoundText,
      searchText,
      pathUrl = "",
      toggleEditing,
    } = this.props;
    return (
      <div className="error">
        <div className="text-center">
          <div className="container-error-404">
            <div className="clip">
              <div className="shadow">
                <span className="digit">{this.state.firstDigit}</span>
              </div>
            </div>
            <div className="clip">
              <div className="shadow">
                <span className="digit">{this.state.secondDigit}</span>
              </div>
            </div>
            <div className="clip">
              <div className="shadow">
                <span className="digit">{this.state.thirstDigit}</span>
              </div>
            </div>
          </div>
          <h2 className="h1">
            Sorry! The {notFoundText} you are looking not found.
          </h2>
          <Link
            onClick={toggleEditing}
            to={pathUrl}
            className={
              this.state.display ? "back-to-home" : "back-to-home-none"
            }
          >
            {searchText}
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
