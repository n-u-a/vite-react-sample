import { useContext } from "react";
import { DialogContext } from "@providers/ModalDialogProvider";

/**
 * ModalDialogProviderの範囲内でのみ利用可能なhookです。
 * @returns
 */
export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a ModalDialogProvider");
  }
  return context;
};
