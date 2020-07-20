import { css } from "@emotion/core";
import React, { useMemo, useState } from "react";
import { IoMdEye as EyeIcon, IoMdEyeOff as EyeOffIcon } from "react-icons/io";
import { v4 as uuid } from "uuid";

export interface InputProps {
  name: string;
  label: string;
  required?: boolean | string;
  error?: any;
  type?: string;
  autoComplete?: string;
  id?: string;
  disabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { name, label, required, error, autoComplete, disabled, type = "text", id },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const internalId = useMemo(() => uuid(), []);
    const trueId = id || internalId;

    function handleShowPasswordClick(e: React.MouseEvent) {
      e.preventDefault();
      setShowPassword(!showPassword);
    }

    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <label htmlFor={trueId}>
          {label}
          {required ? " *" : ""}
        </label>
        <div
          css={css`
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
          `}
        >
          <input
            id={trueId}
            css={css`
              flex-grow: 1;
            `}
            ref={ref}
            name={name}
            type={type === "password" && showPassword ? "text" : type}
            autoComplete={autoComplete}
            disabled={disabled}
            required={Boolean(required)}
          />
          {type === "password" && (
            <button
              css={css`
                position: absolute;
                background-color: transparent;
                border: none;
                &:focus {
                  outline: none;
                }
              `}
              onClick={handleShowPasswordClick}
              tabIndex={-1}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
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
