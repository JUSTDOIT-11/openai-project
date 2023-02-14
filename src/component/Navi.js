import React from "react";
import { Link } from "react-router-dom";

const Navi = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/Auth">Auth</Link>
        </li>
        <li>
          <Link to="/Chat">Chat</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navi;
