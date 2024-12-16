import { useEffect, useRef } from "react";
import { modal } from "../../../styles/ModalTv";
import CloseIcon from "../button/CloseIcon";
import ModalButton from "../button/ModalButton";

export interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmButtonMessage: string;
  cancelButtonMessage: string;
  isShow: boolean;
  isWaiting: boolean;
}

/**
 * 確認ボタン、キャンセルボタンを持つモーダルダイアログ。
 *
 * @params isWaiting ボタンの表示色の制御に使用するフラグ。
 * @params isShow モーダルの表示切替に使用するフラグ。trueの場合に表示する。
 * @params title モーダルに表示するタイトル。
 * @params message モーダルに表示するメッセージ
 * @params onCancel キャンセルボタン押下時の処理
 * @params onConfirm 確認ボタン押下時の処理
 * @params confirmButtonMessage 確認ボタンの文言
 * @params cancelButtonMessage キャンセルボタンの文言
 * @returns ConfirmationModal
 */
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isWaiting,
  isShow,
  title,
  message,
  onCancel,
  onConfirm,
  confirmButtonMessage,
  cancelButtonMessage,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return;

    if (isShow) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isShow]);

  return (
    <dialog ref={modalRef} className={modal({ isShow })}>
      {/* <!-- Modal header --> */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <CloseIcon onClick={onCancel} isWaiting={isWaiting} />
      </div>
      {/* <!-- Modal body --> */}
      <div className="p-4 md:p-5 space-y-4">
        <p className="text-base leading-relaxed text-gray-500">{message}</p>
      </div>
      {/* <!-- Modal footer --> */}
      <div className="text-right p-4 md:p-5 border-t border-gray-200 rounded-b">
        <ModalButton name={confirmButtonMessage} color="confirm" onClick={onConfirm} isWaiting={isWaiting} />
        <ModalButton name={cancelButtonMessage} color="cancel" onClick={onCancel} isWaiting={isWaiting} />
      </div>
    </dialog>
  );
};

export default ConfirmationModal;
