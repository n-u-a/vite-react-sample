import { tv } from "tailwind-variants";

export const tab = tv({
  base: "inline-block p-4 border-b-2 rounded-t-lg",
  variants: {
    isSelected: {
      true: "text-blue-600 border-blue-600",
    },
  },
});
