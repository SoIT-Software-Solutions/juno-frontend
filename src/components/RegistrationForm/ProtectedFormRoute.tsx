import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../common/utils/apiClient";

export const ProtectedFormRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await apiClient.get("/auth/user");
        alert(res.data.message);
        if (res.status === 200) {
          setLoading(false);
        } else {
          navigate("/google", { replace: true });
        }
      } catch (err: any) {
        const msg = err.response?.data?.message || "Unknown error";
        alert(msg);
        navigate("/google", { replace: true });
      }
    };

    checkUser();
  }, [navigate]);

  if (loading) return <div>Checking registration...</div>;

  return children;
};
