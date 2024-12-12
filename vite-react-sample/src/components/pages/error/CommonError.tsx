import { useLocation } from "react-router-dom";
import { container, errorTitleContainer, infoLogoSvg, errorTitle, errorMessage } from "../../../styles/ErrorTv";
import { isNotNullish } from "../../../utils/utils";
import Header from "../../layouts/header/Header";
import { xmlNameSpace, infoLogo } from "../../../constants/SvgConstants";

/**
 * 本画面に遷移する際は、stateにtitle, message, typeを必ず設定してください。
 * title：ページタイトルおよびアラートのタイトル。
 * message：アラート内メッセージ。
 * type：アラートの色。info, danger, dark, warning, darkから選択してください。
 * detail：詳細情報を表示したい場合に設定してください。
 * @returns
 */
const CommonError: React.FC = () => {
  const location = useLocation();

  const { title, message, type, detail } = location.state;

  return (
    <>
      <Header pageTitle={title} />
      <div className={container({ type: type })} role="alert">
        <div className={errorTitleContainer()}>
          <svg className={infoLogoSvg()} aria-hidden="true" xmlns={xmlNameSpace} fill="currentColor" viewBox="0 0 20 20">
            <path d={infoLogo} />
          </svg>
          <h3 className={errorTitle()}>{title}</h3>
        </div>
        <div className={errorMessage()}>
          {message}
          {isNotNullish(detail) && <div>以下のエラー詳細を管理者への問い合わせ時に併せて送付してください。</div>}
        </div>

        {isNotNullish(detail) && <div className={container({ type: "dark", className: "mt-4 text-left" })}>{detail}</div>}
      </div>
    </>
  );
};

export default CommonError;
