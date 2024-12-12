import { useState } from "react";
import { sideBar } from "../../../styles/HeaderTv";
import MenuItem from "../../usecases/menu/listItem/MenuItem";
import Humberger from "../../uiParts/button/Humberger";
import { Page } from "../../../constants/PageConstants";
import { menuUnorderedList } from "../../../styles/MenuTv";

interface HeaderProps {
  pageTitle: string;
}

/**
 * 全画面共通で表示するHeader。
 * @param pageTitle 画面名
 * @returns Header
 */
const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };

  // npm run dev実行時はMODEがdevelopmentになる。npm run buildではならない。
  const mode = import.meta.env.MODE;
  const isDevelopment = mode == "development";

  return (
    <div className="mx-auto">
      <header className="flex justify-between items-center py-3">
        <h1 className="text-xl font-extrabold">{pageTitle}</h1>

        {isDevelopment && <Humberger isOpen={openMenu} toggle={toggleMenuOpen} />}

        {/* サイドバー */}
        {isDevelopment && (
          <nav className={sideBar({ isOpen: openMenu })}>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold my-4 text-left text-gray-900">Menu</h2>
              <Humberger isOpen={openMenu} toggle={toggleMenuOpen} />
            </div>

            <ul className={menuUnorderedList()}>
              <MenuItem pagePath={Page.MAINTENANCE.path()} pageName={Page.MAINTENANCE.title} />
              <MenuItem pagePath={Page.SEARCH.path()} pageName={Page.SEARCH.title} />
            </ul>
          </nav>
        )}
        {openMenu && <div className="bg-gray-900/50 fixed inset-0 z-10" onClick={toggleMenuOpen} aria-hidden="true"></div>}
      </header>
    </div>
  );
};

export default Header;
