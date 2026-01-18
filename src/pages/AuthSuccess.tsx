import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthToken } from "../common/utils/AuthToken";

export const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAccessToken } = useContext(AuthToken);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      setAccessToken(token);

      alert("Auth success");

      navigate("/", { replace: true });
    } else {
      navigate("/google", { replace: true });
    }
  }, [location.search, navigate, setAccessToken]);

  return <div>Logging you in.............</div>;
};
