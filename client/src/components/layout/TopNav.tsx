import { css } from "@emotion/core";
import * as React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../constants";
import { useAuth } from "../../hooks";

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
      <nav css={topnav} id="topnav">
        <TopNavLink to="/" text="Home" />
        {!isAuthenticated && (
          <>
            <TopNavLink to={routes.Login} text="Login" />
            <TopNavLink
              to={routes.RegisterOrg}
              text="Register New Organization"
            />
            <TopNavLink to={routes.RegisterUser} text="Register New User" />
          </>
        )}
        {isAuthenticated && (
          <>
            <TopNavLink to={routes.Assets} text="Assets" />
            <button onClick={logOut}>Log Out</button>
          </>
        )}
      </nav>
    </section>
  );
};

const TopNavLink: React.FunctionComponent<{
  to: string;
  text: string;
  onClick?: () => any;
}> = ({ to, text, onClick }) => {
  return (
    <Link css={headerLink} to={to} onClick={onClick}>
      {text}
    </Link>
  );
};

export default TopNav;
