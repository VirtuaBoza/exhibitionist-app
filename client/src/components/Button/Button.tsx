/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as React from "react";

const button = css`
  background-color: #fcfcfc;
  color: #1f1f1f;
  font-size: 18px;
  padding: 12px;
  border: 2px solid #1f1f1f;
  border-radius: 12px;
  transition: background-color 150ms ease-in-out;
  &:focus {
    outline: 2px solid #99ccff;
    outline-offset: 2px;
  }
  &:hover {
    background-color: #1f1f1f;
    color: #fcfcfc;
  }
  &:disabled {
    border: 2px solid transparent;
    background-color: #d3d3d3;
    color: gray;
  }
`;

interface ButtonProps extends React.ComponentProps<"button"> {
  fullWidth?: boolean;
}

const Button = (props: ButtonProps) => {
  const { children, fullWidth = false, ...rest } = props;
  return (
    <button
      css={[
        button,
        fullWidth &&
          css`
            width: 100%;
          `,
      ]}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
