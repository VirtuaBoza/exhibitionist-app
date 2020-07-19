import { css } from "@emotion/core";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../../constants";
import { useAuth } from "../../hooks";

const topNavStyles = css`
  width: 100vw;
  height: 50px;
`;

const navLinkStyles = css`
  margin: 10px;
  text-decoration-line: none;
  box-shadow: 0 2px 0 #d3d3d3;
`;

const TopNav: React.FC<{}> = (props) => {
  const { logOut } = useAuth();

  return (
    <header>
      <nav css={topNavStyles}>
        <TopNavLink to="/" text="Home" />
        <TopNavLink to={routes.Assets} text="Assets" />
        <TopNavLink to={routes.AddAsset} text="Add Asset" />
        <button onClick={logOut}>Log Out</button>
      </nav>
    </header>
  );
};

const TopNavLink: React.FC<{
  to: string;
  text: string;
}> = ({ to, text }) => {
  return (
    <NavLink css={navLinkStyles} to={to}>
      {text}
    </NavLink>
  );
};

export default TopNav;
