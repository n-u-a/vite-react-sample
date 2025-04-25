import { tv } from "tailwind-variants";

export const modal = tv({
  base: "rounded border-none w-full max-w-2xl max-h-full",
  variants: {
    isShow: {
      false: "hidden",
    },
  },
});
