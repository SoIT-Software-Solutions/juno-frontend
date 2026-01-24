import { useEffect } from "react";

function RegisterOAuth() {
  const backendAPI = import.meta.env.VITE_BACKEND_API;

  const loginWithGoogle = () => {
    window.location.href = backendAPI + "/auth/google";
  };

  const testSession = async () => {
    try {
      const res = await fetch(`${backendAPI}/auth/user`, {
        credentials: "include",
      });

      if (!res.ok) {
        alert("No user session found");
        return;
      }

      const data = await res.json();

      if (!data.authenticated) {
        alert("No user session found");
        return;
      }

      alert(`Logged in as: ${data.user.participant_name} (${data.user.email})`);
    } catch (err) {
      console.error(err);
      alert("Error fetching user session");
    }
  };

  useEffect(() => {
    testSession();
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-white">
        Please sign in with Google to register
      </h1>

      <p className="mt-3 text-sm md:text-base text-white/60">
        New users need to sign in with Google to register.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        <button
          onClick={loginWithGoogle}
          className="flex items-center justify-center rounded-lg bg-white px-12 py-4 text-[20px] font-medium
            text-gray-800 shadow-md transition hover:shadow-lg hover:bg-gray-50 active:scale-[0.98]"
        >
          <span className="font-semibold">Sign in with Google</span>
        </button>
      </div>
      <p className="mt-3 text-sm md:text-base text-white/60">
        <br />
        We only use your Google account to verify your identity and register you for the event.
        <br />
        We will never share your data with third parties. Your data is secure with us.
      </p>
    </section>
  );
}

export default RegisterOAuth;
