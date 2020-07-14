import { css, SerializedStyles } from "@emotion/core";
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
  css?: SerializedStyles;
  disabled?: boolean;
}

const Form: React.FC<FormProps<any>> = ({
  defaultValues,
  onSubmit,
  children,
  css: providedStyles,
  disabled,
  ...rest
}) => {
  const {
    handleSubmit,
    register,
    errors,
    watch,
    // formState: { isValid },
  } = useForm<any>({ defaultValues });

  return (
    <form
      css={[form, providedStyles]}
      onSubmit={handleSubmit<any>(onSubmit)}
      {...rest}
    >
      {React.Children.map(children, (child) => {
        return (child as React.ReactElement).props.name
          ? React.createElement((child as React.ReactElement).type || "text", {
              ...(child as React.ReactElement).props,
              register,
              errors,
              watch,
              disabled:
                (child as React.ReactElement).props.disabled || disabled,
              key: (child as React.ReactElement).props.name,
            })
          : child;
      })}
      {/* FIXME: removed isValid check as there's an issue */}
      <Button fullWidth disabled={disabled} type="submit">
        Submit
      </Button>
    </form>
  );
};

interface LabeledTextInputProps {
  type?: string;
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
  disabled?: boolean;
}

export const LabeledTextInput: React.FC<LabeledTextInputProps> = ({
  type = "text",
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
