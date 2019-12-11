import React from "react";
import GitHubLink from "./GitHubLink";
import "./styles/Header.css";

export const Header = () => (
  <header className="Header">
    <p className="app-name">FontBlender</p>
    <GitHubLink />
  </header>
);

export default React.memo(Header);
