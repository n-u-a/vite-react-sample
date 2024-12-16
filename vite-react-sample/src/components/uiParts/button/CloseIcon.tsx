import { modalButton } from "../../../styles/ButtonTv";

interface CloseIconProps {
  isWaiting?: boolean;
  onClick: () => void;
}

const CloseIcon: React.FC<CloseIconProps> = ({ isWaiting = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={modalButton({
        color: "close",
        size: "auto",
        isWaiting: isWaiting,
      })}
      data-modal-hide="confirmation-modal"
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
  );
};

export default CloseIcon;
