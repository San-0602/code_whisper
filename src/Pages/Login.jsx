import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Github } from "lucide-react";

function Login() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: -40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out"
      }
    );
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center 
    bg-gradient-to-br from-indigo-200 via-white to-purple-200 
    dark:from-gray-900 dark:via-gray-950 dark:to-black 
    transition-all duration-500 relative">

      <a
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 z-50 
        bg-white/70 dark:bg-black/50 backdrop-blur-md 
        px-3 py-2 rounded-lg shadow hover:scale-105 transition"
      >
        {/* Replace this SVG with your logo if you have a file */}
        
          

        <span className="font-semibold dark:text-white">Home</span>
      </a>

      {/* Glow Background */}
      <div className="absolute inset-0 signup-bg pointer-events-none opacity-60"></div>

      {/* Card */}
      <div
        ref={containerRef}
        className="relative bg-white dark:bg-black w-full max-w-md p-8 
        rounded-xl shadow-xl backdrop-blur-lg"
      >
        <h2 className="text-3xl dark:text-white font-semibold text-center mb-6">
          Log in
        </h2>

        {/* OAuth */}
        <div className="flex flex-col gap-3 mb-6">
          <button className="cursor-pointer w-full flex items-center justify-center gap-3 py-2 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition dark:text-white">
            <span className="w-5 h-5">
              {/* Google Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-5 h-5"
              >
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.23l6.9-6.9C34.64 1.87 29.64 0 24 0 14.62 0 6.51 5.53 2.56 13.49l8.03 6.23C12.35 13.36 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.23-.44-4.76H24v9.02h12.65c-.55 2.96-2.21 5.45-4.7 7.13l7.18 5.58C43.91 37.42 46.5 31.36 46.5 24.5z"/>
                <path fill="#FBBC04" d="M10.59 28.27A14.49 14.49 0 0 1 9.5 24c0-1.48.24-2.9.67-4.24l-8.03-6.23C.75 16.63 0 20.23 0 24c0 3.73.75 7.33 2.14 10.47l8.45-6.2z"/>
                <path fill="#34A853" d="M24 48c5.64 0 10.64-1.87 14.54-5.02l-7.18-5.58C29.06 38.16 26.65 39 24 39c-6.26 0-11.65-3.86-13.41-9.27l-8.45 6.2C6.51 42.47 14.62 48 24 48z"/>
              </svg>
            </span>
            Continue with Google
          </button>

          <button className="cursor-pointer w-full flex items-center justify-center gap-3 py-2 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition dark:text-white">
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>

        <div className="text-center text-gray-500 dark:text-white text-sm mb-6">or</div>

        {/* Form */}
        <form className="flex dark:text-white flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="dark:placeholder-white w-full p-3 border rounded-lg focus:outline-none focus:ring required"
          />

          <input
            type="password"
            placeholder="Password"
            className="dark:placeholder-white w-full p-3 border rounded-lg focus:outline-none focus:ring required"
          />

          <div className="flex justify-end">
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="cursor-pointer bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-200"
          >
            Log In
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
