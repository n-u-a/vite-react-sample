import { tv } from "tailwind-variants";

export const menuUnorderedList = tv({
  base: "space-y-2 font-bold text-left",
});

export const menuOption = tv({
  base: "flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 group text-large flex-1 ms-3 whitespace-nowrap",
});
