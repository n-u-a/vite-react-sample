import { Link } from "react-router-dom";
import { menuOption } from "../../styles/HeaderTv";
import Header from "../../components/header/Header";

const Menu: React.FC = () => {
  return (
    <>
      <nav>
        <Header pageTitle="メニュー" />

        <ul className="space-y-2 font-bold text-left">
          <li>
            <Link to={`/maintenance`} className={menuOption()}>
              <span>メンテナンス</span>
            </Link>
          </li>
          <li>
            <Link to={`/status`} className={menuOption()}>
              <span>ステータス</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
