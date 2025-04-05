import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <ul className="nav_header">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/listing">Listing</Link></li>
        </ul>
      </nav>
    </header>
  );
}