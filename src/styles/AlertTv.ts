import { tv } from "tailwind-variants";

export const commonAlert = tv({
  base: "p-4 mb-4 text-sm rounded-lg text-left",
  variants: {
    color: {
      info: "text-blue-800 bg-blue-50",
      danger: "text-red-800  bg-red-50",
      success: "text-green-800  bg-green-50",
      warning: "text-yellow-800 bg-yellow-50",
      dark: "text-gray-800 bg-gray-50",
    },
  },
});
