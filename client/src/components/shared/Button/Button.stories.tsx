import { css } from "@emotion/core";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
};

export const Text = () => (
  <Button onClick={action("clicked!")}>Click Me!</Button>
);

export const FullWidth = () => (
  <div
    css={css`
      width: 500px;
      background-color: lightgray;
    `}
  >
    <p
      css={css`
        text-align: center;
      `}
    >
      A 500 pixel width <code>&lt;div&gt;</code>
    </p>
    <Button onClick={action("clicked!")} fullWidth>
      Full Width Button!
    </Button>
  </div>
);
