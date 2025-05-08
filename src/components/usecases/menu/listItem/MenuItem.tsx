import { Link } from "react-router-dom";
import { menuOption } from "@styles/MenuTv";

interface MenuItemProps {
  pagePath: string;
  pageName: string;
  isOpen: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ pagePath, pageName, isOpen }) => {
  return (
    <>
      <li>
        <Link to={pagePath} className={menuOption()} tabIndex={isOpen ? 0 : -1}>
          <span>{pageName}</span>
        </Link>
      </li>
    </>
  );
};

export default MenuItem;
