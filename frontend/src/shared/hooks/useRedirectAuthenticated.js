// src/shared/hooks/useRedirectAuthenticated.js
import { useLocation, useNavigate } from "react-router-dom";

const useRedirectAuthenticated = (defaultPath = "/") => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || defaultPath;

  const redirectAfterAuth = () => {
    navigate(from, { replace: true });
  };

  return { from, redirectAfterAuth };
};

export default useRedirectAuthenticated;
