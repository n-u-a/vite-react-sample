import { initialize, mswDecorator } from "msw-storybook-addon";
import { handlers } from "../tests/mocks/handlers";
import { Provider } from "react-redux";
import { store } from "../src/states/store";
import "../src/index.css";
import type { Decorator } from "@storybook/react";

initialize({ onUnhandledRequest: "warn" });
const withRedux: Decorator = (Story) => (
  <Provider store={store}>
    <Story />
  </Provider>
);
export const decorators = [mswDecorator, withRedux];

export const parameters = {
  msw: { handlers },
};
