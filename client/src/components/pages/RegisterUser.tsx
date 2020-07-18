import { css } from "@emotion/core";
import * as React from "react";
import Form, { LabeledTextInput } from "../shared/Form";

const page = css`
  text-align: center;
`;

const formContainer = css`
  display: flex;
  justify-content: center;
`;

const RegisterUser: React.FC<{}> = () => {
  const [isShowingPassword, setIsShowingPassword] = React.useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div css={page}>
      <h1>Register A New User</h1>
      <div css={formContainer}>
        <Form onSubmit={onSubmit}>
          <LabeledTextInput
            type="text"
            name="username"
            labelText="Username"
            required="Username is required"
            minLength={2}
          />
          <LabeledTextInput
            type={isShowingPassword ? "text" : "password"}
            name="password"
            labelText="Password (must be minimum 8 characters)"
            required="Password is required"
            minLength={8}
          />
          <LabeledTextInput
            type={isShowingPassword ? "text" : "password"}
            name="password-confirm"
            labelText="Confirm Password"
            validate={(watch) => (value) =>
              value === watch("password") || "Passwords must match!"}
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
