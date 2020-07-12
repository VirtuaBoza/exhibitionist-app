/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";

const topnav = css`
  width: 100vw;
  height: 50px;
`;

const headerLink = css`
  margin: 10px;
  text-decoration-line: none;
  box-shadow: 0 2px 0 #d3d3d3;
`;

const TopNav: React.FunctionComponent<{}> = (props) => {
  const { isAuthenticated, logOut } = useAuth();

  return (
    <section id="header">
      <div css={topnav} id="topnav">
        <TopNavLink to="/" text="Home" />
        {!isAuthenticated && <TopNavLink to="/login" text="Login" />}
        {isAuthenticated && <button onClick={logOut}>Log Out</button>}
        <TopNavLink to="/new-client" text="Create New Organization" />
      </div>
    </section>
  );
};

const TopNavLink: React.FunctionComponent<{ to: string; text: string }> = (
  props
) => {
  return (
    <Link css={headerLink} to={props.to}>
      {props.text}
    </Link>
  );
};

export default TopNav;
