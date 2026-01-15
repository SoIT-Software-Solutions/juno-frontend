import { useEffect } from "react";

function RegisterOAuth() {
  const backendAPI = import.meta.env.VITE_BACKEND_API;

  const loginWithGoogle = () => {
    window.location.href = backendAPI + "/auth/google";
  };

  const testSession = async () => {
    try {
      const res = await fetch(`${backendAPI}/auth/user`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        alert(`Logged in as: ${data.participant_name} (${data.email})`);
      } else {
        alert("No user session found");
      }
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
        New users will be signed up automatically.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        <button
          onClick={loginWithGoogle}
          className="flex items-center justify-center gap-3 rounded-lg bg-white px-8 py-3 text-base font-medium
            text-gray-800 shadow-md transition hover:shadow-lg hover:bg-gray-50 active:scale-[0.98]"
        >
          <span className="font-semibold">Google</span>
        </button>
      </div>
    </section>
  );
}

export default RegisterOAuth;
