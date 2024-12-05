import { tv } from "tailwind-variants";

export const tableHeader = tv({
  base: "text-center text-base px-6 py-3 border-r border-gray-300",
});

export const tableData = tv({
  base: "text-base px-6 py-3 border-r border-gray-200",
  variants: {
    isNotice: {
      true: "font-medium whitespace-nowrap text-red-500",
    },
    link: {
      true: "font-medium text-blue-400 whitespace-nowrap hover:text-blue-600 underline underline-offset-2",
    },
    bg: {
      white: "bg-white",
    },
    format: {
      number: "text-right",
    },
    isInput: {
      true: "text-center",
    },
    isButton: {
      true: "text-center",
    },
  },
});

export const pagenationCount = tv({
  base: "font-semibold text-gray-900",
});

export const pagenation = tv({
  base: "cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700",
  variants: {
    type: {
      previous: "ms-0 border-e-0 rounded-s-lg",
      next: "border rounded-e-lg",
    },
    limit: {
      true: "bg-gray-400 hover:bg-gray-400 hover:text-gray-500 cursor-default",
    },
  },
});

export const pagenationNumber = tv({
  base: "cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700",
  variants: {
    selected: {
      true: "font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700",
    },
  },
});

export const currentDataTableHeader = tv({
  base: "bg-gray-100 text-left p-3",
  variants: {
    isLastItem: {
      false: "border-b border-white",
    },
  },
});

export const currentDataTableData = tv({
  base: "col-span-2 bg-white text-left p-3",
  variants: {
    isLastItem: {
      false: "border-b border-gray-100",
    },
  },
});
