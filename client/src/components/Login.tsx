import * as React from "react";
import { useForm } from "react-hook-form";
import useAuth, { Credentials } from "../hooks/useAuth";

const Login: React.FC<{}> = () => {
  const { register, handleSubmit } = useForm();
  const { logIn, isAuthenticating } = useAuth();
  function onSubmit(data: Credentials) {
    logIn(data);
  }
  return (
    <form onSubmit={handleSubmit<Credentials>(onSubmit)}>
      <input
        placeholder="email"
        name="email"
        ref={register({ required: true })}
        disabled={isAuthenticating}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        ref={register({ required: true })}
        disabled={isAuthenticating}
      />
      <button type="submit" disabled={isAuthenticating}>
        Submit
      </button>
    </form>
  );
};

export default Login;
