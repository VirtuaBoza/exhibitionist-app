/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ErrorMessage } from "@hookform/error-message";
import * as React from "react";

const form = css`
  max-width: 300px;
  text-align: left;
`;

const formButton = css`
  display: block;
  background-color: #004cff;
  color: #d3d3d3;
  border: 2px solid #616161;
  border-radius: 5px;
  padding: 5px;
  margin: 20px 0;
  width: 100%;
  &:disabled {
    background-color: lightgray;
    color: gray;
  }
`;

const input = css`
  display: block;
  padding: 5px;
  border: 2px solid #616161;
  border-radius: 5px;
  margin: 10px 0;
`;

const errorStyle = css`
  display: block;
  color: red;
`;

export interface FormProps extends React.ComponentProps<"form"> {
  isValid: boolean;
  onSubmit: any;
}

const Form: React.FC<FormProps> = ({
  isValid,
  onSubmit,
  children,
  ...rest
}) => {
  return (
    <form css={form} onSubmit={onSubmit} {...rest}>
      {children}
      <button disabled={!isValid} css={formButton} type="submit">
        Submit
      </button>
    </form>
  );
};

interface LabeledFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  labelText: string;
  register: any;
  errors: any;
}

export const LabeledFormInput: React.FC<LabeledFormInputProps> = ({
  type,
  name,
  labelText,
  register,
  errors,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={name}>{labelText}</label>
      <input css={input} type={type} name={name} ref={register} {...rest} />
      <ErrorMessage css={errorStyle} as="p" errors={errors} name={name} />
    </div>
  );
};

export default Form;
