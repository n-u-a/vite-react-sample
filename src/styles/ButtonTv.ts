import { tv } from "tailwind-variants";

export const button = tv({
  base: "text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-base w-full px-5 py-2 text-center mb-3",
  variants: {
    color: {
      primary: "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300",
      secondary: "bg-red-700 hover:bg-red-800 focus:ring-red-300",
    },
    size: {
      small: "w-20",
      medium: "w-36",
      large: "w-52",
      auto: "sm:w-auto",
    },
    isInactivate: {
      true: "bg-gray-400 text-white hover:bg-gray-400 focus:ring-gray-400 cursor-default focus:ring-0",
    },
    isLoading: {
      true: "bg-gray-400 text-white hover:bg-gray-400 focus:ring-gray-400 cursor-wait focus:ring-0",
    },
  },
});

export type TableButtonColor = "primary" | "secondary";
export type TableButtonSize = "small" | "medium" | "large" | "auto";
export const tableButton = tv({
  base: "text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-base w-full px-5 py-2 text-center",
  variants: {
    color: {
      primary: "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300",
      secondary: "bg-red-700 hover:bg-red-800 focus:ring-red-300",
    },
    size: {
      small: "w-20",
      medium: "w-36",
      large: "w-52",
      auto: "sm:w-auto",
    },
    isWaiting: {
      true: "bg-gray-400 text-white hover:bg-gray-400 focus:ring-gray-400 cursor-wait focus:ring-0",
    },
  },
});

export const modalButton = tv({
  base: "text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-base w-full px-5 py-2 text-center mb-3",
  variants: {
    color: {
      confirm:
        "text-white m-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
      cancel:
        "py-2.5 px-5 m-1.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100",
      close:
        "text-gray-700 hover:text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center",
    },
    size: {
      small: "w-20",
      medium: "w-36",
      large: "w-52",
      auto: "sm:w-auto",
    },
    isWaiting: {
      true: "bg-gray-400 text-white hover:bg-gray-400 focus:ring-gray-400 cursor-wait focus:ring-0",
    },
  },
});
