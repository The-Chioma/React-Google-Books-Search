import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        React Google Books Search
      </a>
      <a className="navbar-brand" href="/search">
        Search books on Google
      </a>
    </nav>
  );
}

export default Nav;
