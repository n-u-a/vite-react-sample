import { button } from "@styles/ButtonTv";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary";
  size?: "small" | "medium" | "large" | "auto";
  isLoading?: boolean;
  name: string;
  type?: "button" | "submit";
}

const disabledClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
};

const Button: React.FC<ButtonProps> = ({
  color = "primary",
  size = "auto",
  isLoading = false,
  name,
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      className={button({
        color: color,
        size: size,
        isLoading: isLoading,
      })}
      aria-disabled={isLoading}
      onClick={isLoading ? disabledClick : onClick}
    >
      {name}
    </button>
  );
};

export default Button;
