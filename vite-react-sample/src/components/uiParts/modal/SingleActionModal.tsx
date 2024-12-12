import { modal } from "../../../styles/ModalTv";

interface SingleActionModalProps {
  onClick: () => void;
  title: string;
  message: string;
  buttonMessage: string;
  isShow: boolean;
}

const SingleActionModal: React.FC<SingleActionModalProps> = ({ isShow, title, message, buttonMessage, onClick }) => {
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
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-500">{message}</p>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="p-4 md:p-5 border-t border-gray-200 rounded-b">
              <button
                onClick={onClick}
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {buttonMessage}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleActionModal;
