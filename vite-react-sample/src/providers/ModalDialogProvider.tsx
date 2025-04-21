import React, { createContext, useState, ReactNode } from "react";
import ConfirmationModal from "@components/uiParts/modal/ConfirmationModal";
import SingleActionModal from "@components/uiParts/modal/SingleActionModal";

type DialogType = "confirmation" | "singleAction" | null;

interface OpenDialogConfig {
  type: DialogType;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButtonMessage?: string;
  cancelButtonMessage?: string;
  onClick?: () => void;
  isWaiting?: boolean;
}

interface DialogContextType {
  openDialog: (config: OpenDialogConfig) => void;
  closeDialog: () => void;
  openConfirmationDialog: (config: Omit<OpenDialogConfig, "type">) => void;
  openSingleActionDialog: (config: Omit<OpenDialogConfig, "type">) => void;
}

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

const defaultValues = {
  confirmationDialog: {
    title: "確認",
    confirmButtonMessage: "はい",
    cancelButtonMessage: "いいえ",
    isWaiting: false,
  },
  singleActionDialog: {
    title: "確認",
    confirmButtonMessage: "閉じる",
  },
};

export const ModalDialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dialogConfig, setDialogConfig] = useState<OpenDialogConfig | null>(null);

  const openDialog = (config: OpenDialogConfig) => {
    setDialogConfig(config);
  };

  const closeDialog = () => {
    setDialogConfig(null);
  };

  const openConfirmationDialog = (config: Omit<OpenDialogConfig, "type">) => {
    openDialog({
      type: "confirmation",
      ...defaultValues.confirmationDialog,
      ...config,
    });
  };

  const openSingleActionDialog = (config: Omit<OpenDialogConfig, "type">) => {
    openDialog({
      type: "singleAction",
      ...defaultValues.singleActionDialog,
      ...config,
    });
  };

  const renderDialog = () => {
    if (!dialogConfig) return null;

    const modalCommonProps = {
      isShow: true,
      title: dialogConfig.title,
      message: dialogConfig.message,
    };

    switch (dialogConfig.type) {
      case "confirmation":
        return (
          <ConfirmationModal
            {...modalCommonProps}
            onConfirm={() => {
              dialogConfig.onConfirm?.();
              closeDialog();
            }}
            onCancel={() => {
              dialogConfig.onCancel?.();
              closeDialog();
            }}
            confirmButtonMessage={dialogConfig.confirmButtonMessage!}
            cancelButtonMessage={dialogConfig.cancelButtonMessage!}
            isWaiting={dialogConfig.isWaiting!}
          />
        );
      case "singleAction":
        return (
          <SingleActionModal
            {...modalCommonProps}
            buttonMessage={dialogConfig.confirmButtonMessage!}
            onClick={() => {
              dialogConfig.onClick?.();
              closeDialog();
            }}
          />
        );
      default:
        return null;
    }
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
      {renderDialog()}
    </DialogContext.Provider>
  );
};
