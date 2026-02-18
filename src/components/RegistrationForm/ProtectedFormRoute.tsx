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
      <div className="pt-40 flex flex-col items-center justify-center min-h-screen space-y-6">
        <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-white/60 text-xs font-black tracking-[0.5em] uppercase animate-pulse">
          Validating Access
        </p>
      </div>
    );
  }

  return children;
};
