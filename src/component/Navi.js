import React from "react";
import { Link } from "react-router-dom";

const Navi = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Pages">Pages</Link>
        </li>
        <li>
          <Link to="/Chat">Chat</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navi;
