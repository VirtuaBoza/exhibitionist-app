import { css } from "@emotion/core";
import React from "react";
import { useForm } from "react-hook-form";
import Form, { LabeledTextInput } from "./shared/Form";

const page = css`
  text-align: center;
`;

const formContainer = css`
  display: flex;
  justify-content: center;
`;

const statesRegex = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/;

const RegisterOrg: React.FC<{}> = (props) => {
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
      <h1>Register A New Organization</h1>
      <div css={formContainer}>
        <Form onSubmit={handleSubmit(onSubmit)} isValid={isValid}>
          <LabeledTextInput
            type="text"
            name="organization"
            labelText="Organization name"
            register={register({ required: "Organization name is required." })}
            errors={errors}
          />
          <LabeledTextInput
            type="text"
            name="address1"
            labelText="Street address"
            register={register({ required: "Street address is required." })}
            errors={errors}
          />
          <LabeledTextInput
            type="text"
            name="address2"
            labelText="Suite #, etc. (not required)"
            register={register}
            errors={errors}
          />
          <LabeledTextInput
            type="text"
            name="city"
            labelText="City"
            register={register({ required: "City is required." })}
            errors={errors}
          />
          <LabeledTextInput
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
          <LabeledTextInput
            type="number"
            name="zip"
            labelText="ZIP code"
            register={register({
              required: "ZIP code is required.",
              pattern: {
                value: /\d{5}/g,
                message: "ZIP code must be exactly 5 numerical digits.",
              },
            })}
            errors={errors}
          />
        </Form>
      </div>
    </div>
  );
};

export default RegisterOrg;
