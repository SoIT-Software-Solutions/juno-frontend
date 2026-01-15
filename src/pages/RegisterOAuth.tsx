function RegisterOAuth() {
  const loginWithGoogle = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-white">
        Please sign in with Google to register
      </h1>

      <p className="mt-3 text-sm md:text-base text-white/60">
        New users will be signed up automatically.
      </p>

      <button
        onClick={loginWithGoogle}
        className="mt-10 flex items-center justify-center gap-3 rounded-lg bg-white px-8 py-3 text-base font-medium
        text-gray-800 shadow-md transition hover:shadow-lg hover:bg-gray-50 active:scale-[0.98]"
      >
        <span className="font-semibold">Google</span>
      </button>
    </section>
  );
}

export default RegisterOAuth;
