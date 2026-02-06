import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const refresh = params.get("refresh");
    const access = params.get("access");
    const day = params.get("day");

    if (!refresh || !access) {
      navigate("/", { replace: true });
      return;
    }

    localStorage.setItem("refresh_token", refresh);
    localStorage.setItem("access_token", access);

    if (day) {
      navigate(`/register?day=${day}`, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return <div>Logging you in…</div>;
}
