import { css } from "@emotion/core";
import * as React from "react";

interface ButtonProps extends React.ComponentProps<"button"> {
  fullWidth?: boolean;
}

const Button = ({ children, fullWidth = false, ...rest }: ButtonProps) => {
  return (
    <button
      css={[
        css`
          background-color: #fcfcfc;
          color: #1f1f1f;
          font-size: 18px;
          padding: 12px;
          border: 2px solid #1f1f1f;
          border-radius: 10px;
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
        `,
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
