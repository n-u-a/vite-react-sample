import { modalButton } from "../../../styles/ButtonTv";

interface ButtonProps {
  color?: "confirm" | "cancel" | "close" | undefined;
  size?: "small" | "medium" | "large" | "auto" | undefined;
  isWaiting?: boolean;
  name: string;
  type?: "button" | "submit";
  onClick: () => void;
}

const ModalButton: React.FC<ButtonProps> = ({
  color = "confirm",
  size = "auto",
  isWaiting = false,
  name,
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={modalButton({
        color: color,
        size: size,
        isWaiting: isWaiting,
      })}
    >
      {name}
    </button>
  );
};

export default ModalButton;
