/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ErrorMessage } from "@hookform/error-message";
import * as React from "react";
import Button from "./Button";

const form = css`
  max-width: 500px;
  text-align: left;
`;

const input = css`
  display: block;
  width: 300px;
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

const Form = (props: FormProps) => {
  const { isValid, onSubmit, children, ...rest } = props;
  return (
    <form css={form} onSubmit={onSubmit} {...rest}>
      {children}
      <Button fullWidth disabled={!isValid} type="submit">
        Submit
      </Button>
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

export const LabeledFormInput = (props: LabeledFormInputProps) => {
  const { type, name, labelText, register, errors, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{labelText}</label>
      <input css={input} type={type} name={name} ref={register} {...rest} />
      <ErrorMessage css={errorStyle} as="p" errors={errors} name={name} />
    </div>
  );
};

export default Form;
