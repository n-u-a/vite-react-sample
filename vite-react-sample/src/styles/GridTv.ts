import { tv } from "tailwind-variants";

export const grid = tv({
  base: "grid divide-x-0",
  variants: {
    cols: {
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    },
  },
});

export const orderMaintenanceGridItem = tv({
  base: "p-3",
  variants: {
    position: {
      1: "bg-grey-100 text-left p-3 border-white flex items-center",
      2: "bg-white text-left border-grey-100 flex items-center",
      3: "bg-white text-left border-grey-100",
      4: "bg-white text-right border-grey-100",
    },
    isDanger: {
      true: "font-medium whitespace-nowrap text-red-500",
    },
    isLastItem: {
      true: "border-none",
      false: "border-b",
    },
  },
});
