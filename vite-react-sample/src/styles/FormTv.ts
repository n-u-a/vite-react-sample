import { tv } from "tailwind-variants";

export const form = tv({
  base: "mb-1 bg-gray-100 p-2 rounded-b border-x border-b border-gray-200",
});

export const formCriteriaInputArea = tv({
  base: "grid gap-4 mb-4 md:grid-cols-2",
});

export const orderSearchformCriteriaInputArea = tv({
  base: "grid gap-6 mb-6 md:grid-cols-2",
});

export const updateForm = tv({
  base: "grid gap-4 mb-4 md:grid-cols-1",
});

export const formErrorMessage = tv({
  base: "text-red-500 text-md text-left pb-2 font-bold",
  variants: {
    isIndivisual: {
      true: "pl-2",
    },
  },
});
