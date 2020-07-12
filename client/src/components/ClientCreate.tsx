/** @jsx jsx */
import { css, jsx } from "@emotion/core";
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
`;

const input = css`
  display: block;
  padding: 5px;
  border: 2px solid #616161;
  border-radius: 5px;
  margin: 10px 0;
`;

const statesRegex = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/;

const ClientCreate: React.FunctionComponent<{}> = (props) => {
  return (
    <div css={container}>
      <h1>Create New Organization</h1>
      <div>
        <ClientCreateForm />
      </div>
    </div>
  );
};

const ClientCreateForm: React.FunctionComponent<{}> = (props) => {
  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data: any) => console.log(data);
  const { isValid } = formState;
  return (
    <div css={formContainer}>
      <form css={form} onSubmit={handleSubmit(onSubmit)}>
        <input
          css={input}
          type="text"
          name="organization"
          placeholder="Organization"
          ref={register({ required: "An organization name is required." })}
        />
        <input
          css={input}
          type="text"
          name="city"
          placeholder="City"
          ref={register({ required: "City is required." })}
        />
        <input
          css={input}
          type="text"
          name="state"
          placeholder="State"
          maxLength={2}
          ref={register({
            pattern: {
              value: statesRegex,
              message: "Must be a valid 2-digit state abbreviation.",
            },
          })}
        />
        <input
          css={input}
          type="number"
          name="zip"
          placeholder="ZIP Code"
          maxLength={5}
          ref={register({ required: "ZIP Code is required." })}
        />
        <input disabled={!isValid} type="submit" />
      </form>
    </div>
  );
};

export default ClientCreate;
