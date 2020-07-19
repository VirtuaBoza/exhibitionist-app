import { addDecorator } from "@storybook/react";
import React from "react";
import "../src/index.css";

addDecorator((storyFn) => <div>{storyFn()}</div>);
