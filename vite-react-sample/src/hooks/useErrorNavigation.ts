import { useNavigate } from "react-router-dom";
import { Page } from "../constants/PageConstants";

export const useErrorNavigation = () => {
  const navigate = useNavigate();

  const navigateToErrorPage = (title: string, message: string, type: string = "danger", detail?: string) => {
    navigate(Page.ERROR.path(), {
      replace: true,
      state: { title, message, type, detail },
    });
  };

  return navigateToErrorPage;
};
