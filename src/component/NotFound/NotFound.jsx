import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

function NotFound(props) {
  return (
    <div className="notfound-section">
      <h2>Page Not Found</h2>
      <p>
        Uh-oh! Looks like the page you are trying to access, doesn't exist.
        Please start afresh.
      </p>
      <Link className="notfound-button" to="/">
        go home
      </Link>
    </div>
  );
}

export default NotFound;
