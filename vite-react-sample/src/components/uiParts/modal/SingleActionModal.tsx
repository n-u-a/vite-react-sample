import { useEffect, useRef } from "react";
import { modal } from "@styles/ModalTv";
import ModalButton from "@components/uiParts/button/ModalButton";

interface SingleActionModalProps {
  onClick: () => void;
  title: string;
  message: string;
  buttonMessage: string;
  isShow: boolean;
}

/**
 * ボタンを1つ持つモーダルダイアログ。
 *
 * @params title モーダルに表示するタイトル。
 * @params message モーダルに表示するメッセージ
 * @params isShow モーダルの表示切替に使用するフラグ。trueの場合に表示する。
 * @params buttonMessage ボタンの文言
 * @params onClick ボタン押下時の処理
 * @returns SingleActionModal
 */
const SingleActionModal: React.FC<SingleActionModalProps> = ({ isShow, title, message, buttonMessage, onClick }) => {
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
      </div>
      {/* <!-- Modal body --> */}
      <div className="p-4 md:p-5 space-y-4">
        <p className="text-base leading-relaxed text-gray-500">{message}</p>
      </div>
      {/* <!-- Modal footer --> */}
      <div className="p-4 md:p-5 border-t border-gray-200 rounded-b">
        <ModalButton name={buttonMessage} color="confirm" onClick={onClick} />
      </div>
    </dialog>
  );
};

export default SingleActionModal;
