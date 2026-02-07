import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../../common/utils/apiClient";

export const ProtectedFormRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { day } = useParams<{ day: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        await apiClient.get("/auth/user");
      } catch {
        navigate(`/google?day=${day}`, { replace: true });
        return;
      }

      try {
        const res = await apiClient.get(
          `/event/register/payment/status?day_id=${day}`,
        );

        const state = res.data.state;

        if (state === "NOT_REGISTERED") {
          setLoading(false);
          return;
        }

        if (state === "NO_PAYMENT") {
          navigate(`/register/${day}/payment`, { replace: true });
          return;
        }

        if (state === "PAYMENT_DONE" || state === "VERIFIED_PAYMENT") {
          setLoading(false);
          return;
        }

        throw new Error("Unknown state");
      } catch {
        navigate(`/google?day=${day}`, { replace: true });
      }
    };

    checkAccess();
  }, [navigate, day]);

  if (loading) {
    return (
      <div className="pt-40 text-center text-white min-h-screen">
        Checking form access...
      </div>
    );
  }

  return children;
};
