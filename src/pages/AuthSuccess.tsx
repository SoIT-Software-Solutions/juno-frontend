import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refresh = params.get("refresh");
    const access = params.get("access");

    if (!refresh || !access) {
      navigate("/google", { replace: true });
      return;
    }

    localStorage.setItem("refresh_token", refresh);
    localStorage.setItem("access_token", access);

    navigate("/", { replace: true });
  }, []);

  return <div>Logging you in..............sybau</div>;
}
