import { Page } from "../../../constants/PageConstants";
import { menuUnorderedList } from "../../../styles/MenuTv";
import Footer from "../../layouts/footer/Footer";
import Header from "../../layouts/header/Header";
import MenuItem from "../../usecases/menu/listItem/MenuItem";

const Menu: React.FC = () => {
  return (
    <>
      <Header pageTitle="メニュー" />

      <ul className={menuUnorderedList()}>
        <MenuItem pagePath={Page.MAINTENANCE.path()} pageName={Page.MAINTENANCE.title} />
        <MenuItem pagePath={Page.SEARCH.path()} pageName={Page.SEARCH.title} />
      </ul>
      <Footer />
    </>
  );
};

export default Menu;
