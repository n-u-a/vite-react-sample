import { tv } from "tailwind-variants";

export const inputLabel = tv({
  base: "block mb-1 text-base text-gray-900 text-left",
});

export const inputText = tv({
  base: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
  variants: {
    isDisable: {
      true: "bg-gray-300",
    },
    format: {
      number: "text-right",
    },
  },
});

export const inputDate = tv({
  base: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
});

export const inputCheckBox = tv({
  base: "mt-10 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2",
});

export const inputCheckBoxLabel = tv({
  base: "mt-10 ms-2 text-sm font-medium text-gray-900",
});
