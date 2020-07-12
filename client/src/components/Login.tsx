import * as React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks";

const Login: React.FC<{}> = () => {
  const { register, handleSubmit } = useForm();
  const { setToken } = useAuth();
  function onSubmit(data: any) {
    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(({ id_token }) => {
        setToken(id_token);
      })
      .catch((res) => {
        console.log(res);
      });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="email"
        name="email"
        ref={register({ required: true })}
      />
      <input
        placeholder="password"
        name="password"
        ref={register({ required: true })}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
