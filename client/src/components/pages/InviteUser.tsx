import { css } from "@emotion/core";
import * as React from "react";
import Form, { FormInput } from "../shared/Form";

const InviteUser: React.FC<{}> = () => {
  const [isShowingPassword, setIsShowingPassword] = React.useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div
      css={css`
        text-align: center;
      `}
    >
      <h1>Register A New User</h1>
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <Form onSubmit={onSubmit}>
          <FormInput
            type="text"
            name="username"
            label="Username"
            required="Username is required"
            minLength={2}
          />
          <FormInput
            type={isShowingPassword ? "text" : "password"}
            name="password"
            label="Password (must be minimum 8 characters)"
            required="Password is required"
            minLength={8}
          />
          <FormInput
            type={isShowingPassword ? "text" : "password"}
            name="password-confirm"
            label="Confirm Password"
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

export default InviteUser;
