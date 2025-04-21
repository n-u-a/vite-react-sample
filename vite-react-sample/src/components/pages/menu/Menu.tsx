import { Page } from "@constants/PageConstants";
import { menuUnorderedList } from "@styles/MenuTv";
import Footer from "@components/layouts/footer/Footer";
import Header from "@components/layouts/header/Header";
import MenuItem from "@components/usecases/menu/listItem/MenuItem";

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
