import { useNavigate } from "react-router-dom";

export const useErrorNavigation = () => {
  const navigate = useNavigate();

  const navigateToErrorPage = (title: string, message: string, type: string = "danger", detail?: string) => {
    navigate("/error", {
      replace: true,
      state: { title, message, type, detail },
    });
  };

  return navigateToErrorPage;
};
