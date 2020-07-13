import { css } from "@emotion/core";
import * as React from "react";
import { useForm } from "react-hook-form";
import Form, { LabeledFormInput } from "./shared/Form";

const page = css`
  text-align: center;
`;

const formContainer = css`
  display: flex;
  justify-content: center;
`;

const RegisterUser: React.FC<{}> = () => {
  const [isShowingPassword, setIsShowingPassword] = React.useState(false);

  const { errors, formState, handleSubmit, register } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;

  const onSubmit = (data: any) => console.log(data);

  return (
    <div css={page}>
      <h1>Register A New User</h1>
      <div css={formContainer}>
        <Form onSubmit={handleSubmit(onSubmit)} isValid={isValid}>
          <LabeledFormInput
            type="text"
            name="username"
            labelText="Username"
            register={register({ required: "Username is required" })}
            minLength={2}
            errors={errors}
          />
          <LabeledFormInput
            type={isShowingPassword ? "text" : "password"}
            name="password"
            labelText="Password (must be minimum 8 characters)"
            register={register({
              required: "Password is required",
              minLength: 8,
            })}
            errors={errors}
          />
          <input
            css={css`
              margin-bottom: 20px;
            `}
            type="checkbox"
            name="show-hide-password"
            checked={isShowingPassword}
            onChange={() => setIsShowingPassword(!isShowingPassword)}
          />
          <label htmlFor="show-hide-password">
            {isShowingPassword ? "Hide Password" : "View Password"}
          </label>
        </Form>
      </div>
    </div>
  );
};

export default RegisterUser;
