// Detail.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Detail from "./Detail";

type Story = StoryObj<typeof Detail>;

export default {
  title: "Pages/Detail",
  component: Detail,
  tags: ["skipRouter"],
  parameters: {
    docs: {
      inlineStories: false,
      story: { height: 600, inline: false },
    },
  },
} satisfies Meta<typeof Detail>;

export const Default: Story = {
  name: "Default",
  render: () => (
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/detail/P-001",
          state: { productName: "サンプル商品" },
        },
      ]}
    >
      <Routes>
        <Route path="/detail/:productCode" element={<Detail />} />
      </Routes>
    </MemoryRouter>
  ),
};
