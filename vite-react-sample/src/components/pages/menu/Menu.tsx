import Header from "../../layouts/header/Header";
import MenuItem from "../../usecases/menu/listItem/MenuItem";

const Menu: React.FC = () => {
  return (
    <>
      <nav>
        <Header pageTitle="メニュー" />

        <ul className="space-y-2 font-bold text-left">
          <MenuItem pagePath={"/maintenance"} pageName={"メンテナンス"} />
          <MenuItem pagePath={"/status"} pageName={"ステータス"} />
        </ul>
      </nav>
    </>
  );
};

export default Menu;
