/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as React from "react";

const topnav = css`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 80px;
`;

const TopNav: React.FunctionComponent<{}> = (props) => {
  return (
    <section id="header">
      <div css={topnav} id="topnav"></div>
    </section>
  );
};

export default TopNav;
