import * as React from "react";
import Input from "./Input";

export default {
  title: "Input",
  component: Input,
};

export const Default = () => <Input name="name" label="Name" />;

export const WithError = () => <Input name="name" label="Name" error="error" />;

export const Password = () => (
  <Input name="password" label="Password" type="password" />
);
