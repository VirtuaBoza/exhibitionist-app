import { css } from "@emotion/core";
import React from "react";
import Form, { FormInput } from "../shared/Form";

// const statesRegex = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/;

const EditOrg: React.FC<{}> = (props) => {
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div
      css={css`
        text-align: center;
      `}
    >
      <h1>Register A New Organization</h1>
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <Form onSubmit={onSubmit}>
          <FormInput
            type="text"
            name="organization"
            label="Organization name"
            required="Organization name is required."
          />
          <FormInput
            type="text"
            name="address1"
            label="Street address"
            required="Street address is required."
          />
          <FormInput type="text" name="address2" label="Suite #, etc." />
          <FormInput
            type="text"
            name="city"
            label="City"
            required="City is required."
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
          <FormInput
            type="number"
            name="zip"
            label="ZIP code"
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

export default EditOrg;
