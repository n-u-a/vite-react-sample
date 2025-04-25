import { tv } from "tailwind-variants";

export const container = tv({
  base: "p-4 mb-4 rounded-lg border",
  variants: {
    type: {
      danger: "text-red-800 border-red-300 bg-red-50",
      info: "text-blue-800 border-blue-300 bg-blue-50",
      success: "text-green-800 border-green-300 bg-green-50",
      warning: "text-yellow-800 border-yellow-300 bg-yellow-50",
      dark: "border-gray-300 bg-gray-50",
    },
  },
});

export const errorTitleContainer = tv({
  base: "flex items-center",
});

export const errorTitle = tv({
  base: "text-xl font-medium",
});

export const errorMessage = tv({
  base: "mt-2 mb-4 text-lg text-left",
});

export const infoLogoSvg = tv({
  base: "flex-shrink-0 w-4 h-4 me-2",
});
export const viewLogoSvg = tv({
  base: "me-2 h-3 w-3",
});

export const positiveButton = tv({
  base: "focus:ring-4 focus:outline-none font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center",
  variants: {
    type: {
      danger: "text-white bg-red-800 hover:bg-red-900  focus:ring-red-300",
      info: "text-white bg-blue-800 hover:bg-blue-900 focus:ring-blue-200",
      success:
        "text-white bg-green-800 hover:bg-green-900 focus:ring-green-300",
      warning:
        "text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-yellow-300",
      dark: "text-white bg-gray-700 hover:bg-gray-800 focus:ring-gray-300",
    },
  },
});

export const negativeButton = tv({
  base: "bg-transparent border focus:ring-4 focus:outline-none font-medium rounded-lg text-xs px-3 py-1.5 text-center",
  variants: {
    type: {
      danger:
        "text-red-800 border-red-800 hover:bg-red-900 hover:text-white focus:ring-red-300",
      info: "text-blue-800 border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-blue-200",
      success:
        "text-green-800 border-green-800 hover:bg-green-900 hover:text-white focus:ring-green-300",
      warning:
        "text-yellow-800 border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-yellow-300",
      dark: "text-gray-800 border-gray-700 hover:bg-gray-800 hover:text-white focus:ring-gray-300",
    },
  },
});
