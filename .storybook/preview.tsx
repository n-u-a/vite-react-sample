import { initialize, mswLoader } from "msw-storybook-addon";
import { handlers } from "../tests/mocks/handlers";
import { Provider } from "react-redux";
import { rootReducer } from "../src/states/store";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import type { Decorator, StoryFn, StoryContext } from "@storybook/react";
import "../src/index.css";
import "./manager.css";

initialize({ onUnhandledRequest: "warn" });

const withRedux: Decorator = (Story: StoryFn, ctx: StoryContext) => {
  const store = configureStore({ reducer: rootReducer });
  return (
    <Provider store={store} key={ctx.id}>
      <Story />
    </Provider>
  );
};

/* ---------------- Router ------------------- */
const withRouter: Decorator = (Story: StoryFn, ctx: StoryContext) => {
  // Detail ストーリー（title または kind が "Pages/Detail"）だけは
  if (ctx.tags?.includes("skipRouter")) {
    // Router をまったく巻かずにそのまま描画
    return <Story />;
  }
  // それ以外はこれまで通り Router でラップ
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Story />
    </MemoryRouter>
  );
};

/* ---------------- #root ラッパー ------------ */
const withAppRoot: Decorator = (Story: StoryFn) => (
  <div id="root">
    <Story />
  </div>
);

const withSWR: Decorator = (Story: StoryFn, ctx: StoryContext) => (
  <SWRConfig
    /* provider に “毎回まっさらな Map” を返す関数を与える */
    value={{ provider: () => new Map() }}
    /* ↓オプション例――再検証を完全に止めたい場合 */
    // value={{ provider: () => new Map(), dedupingInterval: 0, revalidateOnFocus: false }}
    key={ctx.id} /* ctx.id を key にすると Story 切替で強制アンマウント */
  >
    <Story />
  </SWRConfig>
);

export const parameters = { msw: { handlers } };
export const decorators = [withRedux, withRouter, withAppRoot, withSWR];
export const loaders = [mswLoader];
