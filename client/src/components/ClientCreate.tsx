/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useForm } from "react-hook-form";

const container = css`
  text-align: center;
`;

const formContainer = css`
  display: flex;
  justify-content: center;
`;

const form = css`
  max-width: 300px;
  text-align: left;
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

const statesRegex = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/;

const ClientCreate: React.FC<{}> = (props) => {
  return (
    <div css={container}>
      <h1>Create New Organization</h1>
      <div>
        <ClientCreateForm />
      </div>
    </div>
  );
};

const ClientCreateForm: React.FC<{}> = (props) => {
  const { errors, formState, handleSubmit, register, reset } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data: any) => {
    console.log(data);
    reset({});
  };
  const { isValid } = formState;
  return (
    <div css={formContainer}>
      <form
        css={form}
        id="client-create-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <LabeledFormInput
          type="text"
          name="organization"
          labelText="Organization"
          register={register({ required: "Organization name is required." })}
          errors={errors}
        />
        <LabeledFormInput
          type="text"
          name="city"
          labelText="City"
          register={register({ required: "City is required." })}
          errors={errors}
        />
        <LabeledFormInput
          type="text"
          name="state"
          labelText="State"
          register={register({
            required: "State is required.",
            pattern: {
              value: statesRegex,
              message: "Must be a valid 2-digit state abbreviation.",
            },
          })}
          maxLength={2}
          errors={errors}
        />
        <LabeledFormInput
          type="number"
          name="zip"
          labelText="ZIP Code"
          register={register({
            required: "ZIP Code is required.",
            pattern: {
              value: /\d{5}/g,
              message: "ZIP Code must be exactly 5 numerical digits.",
            },
          })}
          errors={errors}
        />
        <button disabled={!isValid} css={formButton} form="client-create-form">
          Submit
        </button>
      </form>
    </div>
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

const LabeledFormInput = (props: LabeledFormInputProps) => {
  const { type, name, labelText, register, errors, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{labelText}</label>
      <input css={input} type={type} name={name} ref={register} {...rest} />
      <ErrorMessage css={errorStyle} as="p" errors={errors} name={name} />
    </div>
  );
};

export default ClientCreate;
