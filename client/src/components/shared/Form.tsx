import { css } from "@emotion/core";
import { ErrorMessage } from "@hookform/error-message";
import * as React from "react";
import { useForm } from "react-hook-form";
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

export interface FormProps<T> {
  defaultValues?: T;
  onSubmit: (data: T) => any;
}

const Form: React.FC<FormProps<any>> = ({
  defaultValues = {},
  onSubmit,
  children,
  ...rest
}) => {
  const {
    handleSubmit,
    register,
    errors,
    watch,
    formState: { isValid },
  } = useForm<any>({ defaultValues });
  return (
    <form css={form} onSubmit={handleSubmit<any>(onSubmit)} {...rest}>
      {React.Children.map(children, (child) => {
        return (child as React.ReactElement).props.name
          ? React.createElement((child as React.ReactElement).type, {
              ...(child as React.ReactElement).props,
              register,
              errors,
              watch,
              key: (child as React.ReactElement).props.name,
            })
          : child;
      })}
      <Button fullWidth disabled={!isValid} type="submit">
        Submit
      </Button>
    </form>
  );
};

interface LabeledTextInputProps {
  type: string;
  name: string;
  labelText: string;
  required?: boolean | string;
  register?: any;
  errors?: any;
  pattern?: {
    value: string | RegExp;
    message: string;
  };
  minLength?: number;
  validate?: (watch: any) => (input: string) => any;
  watch?: any;
}

export const LabeledTextInput: React.FC<LabeledTextInputProps> = ({
  type,
  name,
  labelText,
  register,
  errors,
  required,
  pattern,
  validate,
  watch,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={name}>
        {labelText}
        {required ? " *" : ""}
      </label>
      <input
        css={input}
        type={type}
        name={name}
        ref={register({
          required,
          pattern,
          validate: validate ? validate(watch) : undefined,
        })}
        {...rest}
      />
      <ErrorMessage css={errorStyle} as="p" errors={errors} name={name} />
    </div>
  );
};

export default Form;
