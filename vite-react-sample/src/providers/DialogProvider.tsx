import React, { createContext, useState, ReactNode } from "react";
import ConfirmationModal from "../components/uiParts/modal/ConfirmationModal";
import SingleActionModal from "../components/uiParts/modal/SingleActionModal";

type DialogType = "confirmation" | "singleAction" | null;

type OpenConfirmationConfig = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmButtonMessage?: string;
  cancelButtonMessage?: string;
  isWaiting?: boolean;
};
type OpenSingleActionConfig = {
  title: string;
  message: string;
  onClick: () => void;
  buttonMessage?: string;
};

interface DialogContextType {
  openDialog: (config: OpenDialogConfig) => void;
  closeDialog: () => void;
  openConfirmationDialog: (config: OpenConfirmationConfig) => void;
  openSingleActionDialog: (config: OpenSingleActionConfig) => void;
}

interface OpenDialogConfig {
  type: DialogType;
  message: string;
  title?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButtonMessage?: string;
  cancelButtonMessage?: string;
  buttonMessage?: string;
  onClick?: () => void;
  isWaiting?: boolean;
  isShow?: boolean;
}

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

const defaultTitle = "確認";
const singleActionDialogButtonDefaultMessage = "閉じる";
const confirmationDialogConfirmButtonDefaultMessage = "はい";
const confirmationDialogCancelButtonDefaultMessage = "いいえ";

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dialogConfig, setDialogConfig] = useState<OpenDialogConfig | null>(null);

  const openDialog = (config: OpenDialogConfig) => {
    setDialogConfig(config);
  };

  const closeDialog = () => {
    setDialogConfig(null);
  };

  const openConfirmationDialog = ({
    title,
    message,
    onConfirm,
    onCancel = closeDialog,
    confirmButtonMessage = confirmationDialogConfirmButtonDefaultMessage,
    cancelButtonMessage = confirmationDialogCancelButtonDefaultMessage,
    isWaiting = false,
  }: OpenConfirmationConfig) => {
    openDialog({
      type: "confirmation",
      title: title,
      message: message,
      onConfirm: onConfirm,
      onCancel: onCancel,
      confirmButtonMessage: confirmButtonMessage,
      cancelButtonMessage: cancelButtonMessage,
      isWaiting: isWaiting,
    });
  };

  const openSingleActionDialog = ({
    title,
    message,
    buttonMessage = singleActionDialogButtonDefaultMessage,
    onClick = () => {},
  }: OpenSingleActionConfig) => {
    openDialog({
      type: "singleAction",
      title: title,
      message: message,
      buttonMessage: buttonMessage,
      onClick,
    });
  };

  return (
    <DialogContext.Provider
      value={{
        openDialog,
        closeDialog,
        openConfirmationDialog,
        openSingleActionDialog,
      }}
    >
      {children}
      {dialogConfig?.type === "confirmation" && (
        <ConfirmationModal
          isShow={true}
          title={dialogConfig.title || defaultTitle}
          message={dialogConfig.message}
          onConfirm={() => {
            dialogConfig.onConfirm?.();
            closeDialog();
          }}
          onCancel={() => {
            dialogConfig.onCancel?.();
            closeDialog();
          }}
          confirmButtonMessage={dialogConfig.confirmButtonMessage || confirmationDialogConfirmButtonDefaultMessage}
          cancelButtonMessage={dialogConfig.cancelButtonMessage || confirmationDialogCancelButtonDefaultMessage}
          isWaiting={dialogConfig.isWaiting || false}
        />
      )}
      {dialogConfig?.type === "singleAction" && (
        <SingleActionModal
          isShow={true}
          title={dialogConfig.title || defaultTitle}
          message={dialogConfig.message}
          buttonMessage={dialogConfig.buttonMessage || singleActionDialogButtonDefaultMessage}
          onClick={() => {
            dialogConfig.onClick?.();
            closeDialog();
          }}
        />
      )}
    </DialogContext.Provider>
  );
};
