import { useState } from "react";
import { Link } from "react-router-dom";
import {
  headerOption,
  humberger,
  humbergerLineBottom,
  humbergerLineMiddle,
  humbergerLineTop,
  sideBar,
} from "../../../styles/HeaderTv";

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

        {/* Hamburger Button */}
        {isDevelopment && (
          <button onClick={toggleMenuOpen} type="button" aria-description="menu" className={humberger()}>
            <div className={humbergerLineTop({ isOpen: openMenu })} />
            <div className={humbergerLineMiddle({ isOpen: openMenu })} />
            <div className={humbergerLineBottom({ isOpen: openMenu })} />
          </button>
        )}

        {/* Navigation */}
        {isDevelopment && (
          <nav className={sideBar({ isOpen: openMenu })}>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold my-4 text-left text-gray-900">Menu</h2>

              <button onClick={toggleMenuOpen} type="button" aria-description="Close menu" className={humberger()}>
                <div className={humbergerLineTop({ isOpen: openMenu })} />
                <div className={humbergerLineMiddle({ isOpen: openMenu })} />
                <div className={humbergerLineBottom({ isOpen: openMenu })} />
              </button>
            </div>

            <ul className="space-y-2 font-bold text-left">
              <li>
                <Link to={`/maintenance`} className={headerOption()}>
                  <span>メンテナンス</span>
                </Link>
              </li>
              <li>
                <Link to={`/status`} className={headerOption()}>
                  <span>ステータス</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
        {openMenu && <div className="bg-gray-900/50 fixed inset-0 z-10" onClick={toggleMenuOpen} aria-hidden="true"></div>}
      </header>
    </div>
  );
};

export default Header;
