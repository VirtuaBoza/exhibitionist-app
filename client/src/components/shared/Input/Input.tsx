import { css } from "@emotion/core";
import React from "react";

export interface InputProps {
  name: string;
  label: string;
  required?: boolean | string;
  error?: any;
  type?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, required, error, type = "text" }, ref) => {
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <label htmlFor={`${name}-input`}>
          {label}
          {required ? " *" : ""}
        </label>
        <input id={`${name}-input`} ref={ref} name={name} type={type} />
        <p
          css={css`
            min-height: 1.25rem;
            text-align: right;
            color: red;
          `}
        >
          {error}
        </p>
      </div>
    );
  }
);

export default Input;
