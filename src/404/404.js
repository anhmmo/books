import React from "react";

import "./404.scss";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
  constructor() {
    super();
    this.state = {
      digit1: 4,
      digit2: 0,
      digit3: 4,
      display: false,
    };
  }

  componentDidMount() {
    let number, number2, number3;

    this.setTime = setInterval(() => {
      number = Math.floor(Math.random() * 5);
      number2 = Math.floor(Math.random() * 2);
      number3 = Math.floor(Math.random() * 5);
      this.setState({ digit1: number, digit2: number2, digit3: number3 });
      if (number === 4 && number2 === 0 && number3 === 4) {
        this.setState({ display: true });
        clearInterval(this.setTime);
      }
    }, 100);
  }

  componentWillUnmount() {
    if (this.setTime) clearInterval(this.setTime);
  }

  render() {
    return (
      <div className="error">
        <div className="text-center">
          <div className="container-error-404">
            <div className="clip">
              <div className="shadow">
                <span className="digit">{this.state.digit1}</span>
              </div>
            </div>
            <div className="clip">
              <div className="shadow">
                <span className="digit">{this.state.digit2}</span>
              </div>
            </div>
            <div className="clip">
              <div className="shadow">
                <span className="digit">{this.state.digit3}</span>
              </div>
            </div>
          </div>
          <h2 className="h1">Sorry! The page you are looking not found</h2>
          <Link
            to="/"
            className={
              this.state.display ? "back-to-home" : "back-to-home-none"
            }
          >
            Back To Home
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
