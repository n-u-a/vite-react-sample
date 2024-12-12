import { useLocation, useParams } from "react-router-dom";

const Detail: React.FC = () => {
  // Linkで渡されたstateの取得
  const location = useLocation();
  const { productName } = location.state;

  // パスパラメータの取得
  const { productCode } = useParams<{
    productCode: string;
  }>();

  return (
    <>
      {productCode} : {productName} の明細画面
    </>
  );
};

export default Detail;
