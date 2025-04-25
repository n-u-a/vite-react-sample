import { tv } from "tailwind-variants";

export const headerOption = tv({
  base: "flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 group text-large flex-1 ms-3 whitespace-nowrap",
});

export const sideBar = tv({
  base: "fixed bg-slate-50 right-0 top-0 w-4/12 h-screen flex flex-col justify-start pt-4 px-3 transition-transform duration-300 ease-in-out z-20",
  variants: {
    isOpen: {
      true: "transform translate-x-0",
      false: "transform translate-x-full",
    },
  },
});

export const humberger = tv({
  base: "space-y-2 rounded-lg z-10 w-10 px-1 py-2 hover:bg-gray-200 flex flex-col justify-between items-center group",
});

export const humbergerLineBase = tv({
  base: "w-4/5 h-0.5 bg-gray-400 duration-300 ease-in-out group-hover:bg-gray-700",
});
export const humbergerLineTop = tv({
  extend: humbergerLineBase,
  base: "transition-transform",
  variants: {
    isOpen: {
      true: "transform rotate-45 translate-y-2.5",
    },
  },
});
export const humbergerLineMiddle = tv({
  extend: humbergerLineBase,
  base: "transition-opacity",
  variants: {
    isOpen: {
      true: "opacity-0",
    },
  },
});
export const humbergerLineBottom = tv({
  extend: humbergerLineBase,
  base: "transition-transform",
  variants: {
    isOpen: {
      true: "transform -rotate-45 -translate-y-2.5",
    },
  },
});
