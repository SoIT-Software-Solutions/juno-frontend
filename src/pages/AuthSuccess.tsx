import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthToken } from "../common/utils/AuthToken";

export const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAccessToken } = useContext(AuthToken);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const access = params.get("access");
    const refresh = params.get("refresh");

    if (access && refresh) {
      setAccessToken(access);

      document.cookie = `refresh_token=${refresh}; path=/; secure; sameSite=none`;

      window.history.replaceState({}, document.title, "/");

      navigate("/", { replace: true });

      alert("Auth success");
    } else {
      navigate("/google", { replace: true });
    }
  }, [location.search, navigate, setAccessToken]);

  return <div>Logging you in.............</div>;
};
