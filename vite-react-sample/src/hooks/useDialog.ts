import { useContext } from "react";
import { DialogContext } from "../providers/DialogProvider";

/**
 * DialogProviderの範囲内でのみ利用可能なhookです。
 * @returns
 */
export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
