/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { useForm } from "react-hook-form";
import Form, { LabeledFormInput } from "./Form";

const page = css`
  text-align: center;
`;

const formContainer = css`
  display: flex;
  justify-content: center;
`;

const statesRegex = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/;

const ClientCreate: React.FC<{}> = (props) => {
  const { errors, formState, handleSubmit, register, reset } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data: any) => {
    console.log(data);
    reset({});
  };
  const { isValid } = formState;
  return (
    <div css={page}>
      <h1>Create New Organization</h1>
      <div css={formContainer}>
        <Form onSubmit={handleSubmit(onSubmit)} isValid={isValid}>
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
        </Form>
      </div>
    </div>
  );
};

export default ClientCreate;
