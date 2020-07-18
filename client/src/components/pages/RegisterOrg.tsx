import { css } from "@emotion/core";
import React from "react";
import Form, { LabeledTextInput } from "../shared/Form";

const page = css`
  text-align: center;
`;

const formContainer = css`
  display: flex;
  justify-content: center;
`;

// const statesRegex = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/;

const RegisterOrg: React.FC<{}> = (props) => {
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div css={page}>
      <h1>Register A New Organization</h1>
      <div css={formContainer}>
        <Form onSubmit={onSubmit}>
          <LabeledTextInput
            type="text"
            name="organization"
            labelText="Organization name"
            required="Organization name is required."
          />
          <LabeledTextInput
            type="text"
            name="address1"
            labelText="Street address"
            required="Street address is required."
          />
          <LabeledTextInput
            type="text"
            name="address2"
            labelText="Suite #, etc."
          />
          <LabeledTextInput
            type="text"
            name="city"
            labelText="City"
            register="City is required."
          />
          {/* If we're only allowing certain values, let's make this a select or autocomplete */}
          {/* <LabeledTextInput
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
          /> */}
          <LabeledTextInput
            type="number"
            name="zip"
            labelText="ZIP code"
            required="ZIP code is required."
            pattern={{
              value: /\d{5}/g,
              message: "ZIP code must be exactly 5 numerical digits.",
            }}
          />
        </Form>
      </div>
    </div>
  );
};

export default RegisterOrg;
