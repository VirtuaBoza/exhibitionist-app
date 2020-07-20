import { ErrorMessage } from "@hookform/error-message";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { InputProps } from "./Input/Input";

interface FormContextValue {
  disabled?: boolean;
  register: any;
  watch: any;
  errors: any;
}

export const FormContext = React.createContext<FormContextValue>(
  {} as FormContextValue
);

export interface FormProps<T> {
  defaultValues?: T;
  onSubmit: (data: T) => any;
  disabled?: boolean;
}

const Form: React.FC<FormProps<any>> = ({
  defaultValues,
  onSubmit,
  children,
  disabled,
  ...rest
}) => {
  const formHelpers = useForm<any>({ defaultValues });

  return (
    <form {...rest} onSubmit={formHelpers.handleSubmit<any>(onSubmit)}>
      <FormContext.Provider value={{ ...formHelpers, disabled }}>
        {children}
      </FormContext.Provider>
    </form>
  );
};

interface FormInputProps extends InputProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean | string;
  pattern?: {
    value: string | RegExp;
    message: string;
  };
  minLength?: number;
  validate?: (watch: any) => (input: string) => any;
  disabled?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  required,
  pattern,
  validate,
  disabled,
  ...rest
}) => {
  const { register, watch, errors, disabled: formDisabled } = useContext(
    FormContext
  );

  return (
    <Input
      {...rest}
      label={label}
      name={name}
      error={<ErrorMessage errors={errors} name={name} />}
      ref={register({
        required:
          typeof required === "boolean" && required
            ? `${label} is required`
            : required,
        pattern,
        validate: validate ? validate(watch) : undefined,
      })}
      required={required}
      disabled={disabled || formDisabled}
    />
  );
};

export default Form;
