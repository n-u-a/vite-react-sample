import Header from "../../components/header/Header";
import MenuItem from "../../components/listItem/menuItem";

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
