import { Link } from "react-router-dom";
import { menuOption } from "@styles/MenuTv";

interface MenuItemProps {
  pagePath: string;
  pageName: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ pagePath, pageName }) => {
  return (
    <>
      <li>
        <Link to={pagePath} className={menuOption()}>
          <span>{pageName}</span>
        </Link>
      </li>
    </>
  );
};

export default MenuItem;
