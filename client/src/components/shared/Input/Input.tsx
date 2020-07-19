import { css } from "@emotion/core";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

export interface InputProps {
  name: string;
  label: string;
  required?: boolean | string;
  error?: any;
  type?: string;
  autoComplete?: string;
  id?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { name, label, required, error, autoComplete, type = "text", id = uuid() },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <label htmlFor={id}>
          {label}
          {required ? " *" : ""}
        </label>
        <div
          css={css`
            display: flex;
          `}
        >
          <input
            id={id}
            css={css`
              flex-grow: 1;
            `}
            ref={ref}
            name={name}
            type={type === "password" && showPassword ? "text" : type}
            autoComplete={autoComplete}
          />
          {/* TODO: make pretty */}
          {type === "password" && (
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              <input
                id={`${id}-show`}
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label
                htmlFor={`${id}-show`}
                css={css`
                  user-select: none;
                `}
              >
                Show
              </label>
            </div>
          )}
        </div>
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
