import { css } from "@emotion/core";
import React from "react";
import { useAuth, useTabs } from "../../hooks";
import Button from "../shared/Button";
import Form, { FormInput } from "../shared/Form";
import { H2 } from "../shared/Headings";

const tabs = [
  {
    name: "login",
    label: "Login",
    component: LoginForm,
  },
  {
    name: "register",
    label: "Register",
    component: RegistrationForm,
  },
];

const LandingPage: React.FC<{}> = () => {
  const { tabsRef, panelsRef, selectedTabIndex, handleTabClick } = useTabs(0);

  return (
    <main
      css={css`
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: url(https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80)
          no-repeat center center fixed;
        background-size: cover;
      `}
    >
      <div
        css={css`
          margin: 0 auto;
          background-color: white;
          border-radius: 15px;
          padding: 2rem;
        `}
      >
        <h1
          css={css`
            font-family: "Abril Fatface", cursive;
            font-size: 4rem;
            margin-bottom: 1rem;
          `}
        >
          Exhibitionist
        </h1>
        <ul
          role="tablist"
          css={css`
            display: flex;
            border-bottom: solid 1px black;
            > * {
              flex-grow: 1;
              margin: 0.25rem;
            }
          `}
        >
          {tabs.map(({ name, label }, index) => (
            <li key={name} role="presentation">
              <a
                id={`${name}-tab`}
                role="tab"
                css={css`
                  width: 100%;
                  display: inline-block;
                  text-align: center;
                  padding: 1rem 0;
                `}
                href={`#${name}`}
                aria-selected={selectedTabIndex === index}
                tabIndex={selectedTabIndex === index ? 0 : -1}
                onClick={(e) => handleTabClick(e, index)}
                ref={(ref) => (tabsRef.current[index] = ref)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {tabs.map(({ name, component: Component }, index) => (
          <section
            key={name}
            role="tabpanel"
            id={name}
            aria-labelledby={`${name}-tab`}
            hidden={selectedTabIndex !== index}
            ref={(ref) => (panelsRef.current[index] = ref)}
            tabIndex={-1}
            css={css`
              &:focus {
                outline-style: none;
              }
            `}
          >
            <Component />
          </section>
        ))}
      </div>
    </main>
  );
};

const headerStyles = css`
  text-align: center;
  margin: 1rem;
`;

const submitButtonStyles = css`
  margin-top: 1rem;
`;

interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
  const { logIn, isAuthenticating, authenticationError } = useAuth();

  function handleSubmit(data: LoginFormData) {
    logIn(data);
  }
  return (
    <>
      <H2 css={headerStyles}>Login</H2>
      <Form onSubmit={handleSubmit} disabled={isAuthenticating}>
        <FormInput label="Email" name="email" type="email" required />
        <FormInput label="Password" name="password" type="password" required />
        <Button css={submitButtonStyles} type="submit" fullWidth>
          Login
        </Button>
        <p>{authenticationError}</p>
      </Form>
    </>
  );
}

interface RegistrationFormData extends LoginFormData {
  orgName: string;
}

function RegistrationForm() {
  function handleSubmit(data: RegistrationFormData) {
    console.log(data);
  }

  return (
    <>
      <H2 css={headerStyles}>Register</H2>
      <Form onSubmit={handleSubmit}>
        <FormInput label="Organization" name="orgName" required />
        <FormInput label="Email" name="email" required />
        <FormInput label="Password" name="password" required />
        <Button css={submitButtonStyles} type="submit" fullWidth>
          Register
        </Button>
      </Form>
    </>
  );
}

export default LandingPage;
