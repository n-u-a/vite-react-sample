import { modalButton } from "../../styles/ButtonTv";
import { modal } from "../../styles/ModalTv";

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
 * @returns
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
  return (
    <>
      {/* <!-- Main modal --> */}
      <div id="default-modal" tabIndex={-1} aria-hidden="true" className={modal({ isShow: isShow })}>
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <button
                onClick={onCancel}
                type="button"
                className={modalButton({
                  color: "close",
                  size: "auto",
                  isWaiting: isWaiting,
                })}
                data-modal-hide="default-modal"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-500">{message}</p>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="text-right p-4 md:p-5 border-t border-gray-200 rounded-b">
              <button
                onClick={onConfirm}
                data-modal-hide="default-modal"
                type="button"
                className={modalButton({
                  color: "confirm",
                  size: "auto",
                  isWaiting: isWaiting,
                })}
              >
                {confirmButtonMessage}
              </button>
              <button
                onClick={onCancel}
                data-modal-hide="default-modal"
                type="button"
                className={modalButton({
                  color: "cancel",
                  size: "auto",
                  isWaiting: isWaiting,
                })}
              >
                {cancelButtonMessage}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
