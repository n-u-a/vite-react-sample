import { useNavigate } from "react-router-dom";
import { Page } from "../constants/PageConstants";

interface ErrorPageProps {
  title: string;
  message: string;
  type?: "danger" | "info" | "success" | "warning" | "dark";
  detail?: string;
}

export const useErrorNavigation = () => {
  const navigate = useNavigate();

  const navigateToErrorPage = ({ title, message, type = "danger", detail }: ErrorPageProps) => {
    navigate(Page.ERROR.path(), {
      replace: true,
      state: { title, message, type, detail },
    });
  };

  return navigateToErrorPage;
};
