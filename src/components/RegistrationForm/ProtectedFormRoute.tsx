import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../common/utils/apiClient";

export const ProtectedFormRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await apiClient.get("/user");
        if (res.status === 200) {
          setLoading(false);
        } else {
          window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
        }
      } catch (err) {
        console.error(err);
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
      }
    };

    checkUser();
  }, [navigate]);

  if (loading) return <div>Checking registration...</div>;

  return children;
};
