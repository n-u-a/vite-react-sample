import { tv } from "tailwind-variants";

export const accordion = tv({
  base: "bg-gray-100 mb-4 rounded-md",
});

export const accordionTitle = tv({
  base: "list-none",
});

export const accordionToggleButton = tv({
  base: "flex items-center justify-between w-full p-2 font-medium rtl:text-right text-gray-900 border border-gray-200  hover:bg-gray-100 gap-3",
  variants: {
    isOpen: {
      true: "rounded-t-md",
      false: "rounded-md",
    },
  },
});

export const accordionToggleButtonIcon = tv({
  base: "w-3 h-3 transform",
  variants: {
    isOpen: {
      true: "rotate-180",
      false: "rotate-0",
    },
  },
});

export const accordionChildren = tv({
  base: "",
  variants: {
    isOpen: {
      true: "block",
      false: "hidden",
    },
  },
});
