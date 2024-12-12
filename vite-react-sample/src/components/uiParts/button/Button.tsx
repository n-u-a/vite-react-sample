import { button } from "../../../styles/ButtonTv";

interface ButtonProps {
  color?: "primary" | "secondary" | undefined;
  size?: "small" | "medium" | "large" | "auto" | undefined;
  isWaiting?: boolean;
  name: string;
  type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({ color = "primary", size = "auto", isWaiting = false, name, type = "button" }) => {
  return (
    <button
      type={type}
      className={button({
        color: color,
        size: size,
        isWaiting: isWaiting,
      })}
    >
      {name}
    </button>
  );
};

export default Button;
