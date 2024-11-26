import { tv } from "tailwind-variants";

export const modal = tv({
  base: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
  variants: {
    isShow: {
      false: "hidden",
    },
  },
});
