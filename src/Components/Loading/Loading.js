import React from "react";
import "./Loading.scss";
import { Link } from "react-router-dom";

import Animate from "./Animate/Animate";

class Loading extends React.Component {
  constructor() {
    super();
    this.state = {
      display: false,
    };
  }

  componentDidMount = () => {
    this.timerHandle = setTimeout(() => {
      console.log("hello");

      this.setState({ display: true });
    }, 5000);
  };
  componentWillUnmount = () => {
    // Is our timer running?
    if (this.timerHandle) {
      // Yes, clear it
      clearTimeout(this.timerHandle);
    }
  };
  render() {
    return (
      <div className="loading">
        <svg
          version="1.1"
          id="L4"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enableBackground="new 0 0 0 0"
        >
          <Animate cx="6" begin="0.1" />

          <Animate cx="26" begin="0.2" />

          <Animate cx="46" begin="0.3" />
        </svg>
        <Link
          to="/search"
          className="new-book"
          style={
            this.state.display ? { display: "block" } : { display: "none" }
          }
        >
          click here to add new book
        </Link>
      </div>
    );
  }
}

export default Loading;
