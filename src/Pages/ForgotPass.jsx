import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowLeft } from "lucide-react";

function ForgotPass() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "power2.out"
      }
    );
  }, []);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative
      bg-gradient-to-br from-indigo-200 via-white to-purple-200 
      dark:from-gray-900 dark:via-gray-950 dark:to-black
      transition-all duration-500"
    >
      {/* Glow BG */}
      <div className="absolute inset-0 signup-bg pointer-events-none opacity-60"></div>

      {/* Back button */}
      <a
        href="/login"
        className="absolute top-6 left-6 flex items-center gap-2 z-50 
        bg-white/70 dark:bg-black/50 backdrop-blur-md 
        px-3 py-2 rounded-lg shadow hover:scale-105 transition"
      >
        <ArrowLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
        <span className="font-medium dark:text-white">Back</span>
      </a>

      {/* Card */}
      <div
        ref={containerRef}
        className="relative bg-white dark:bg-black w-full max-w-md p-8 
        rounded-xl shadow-xl backdrop-blur-lg"
      >
        <h2 className="text-3xl dark:text-white font-semibold text-center mb-4">
          Reset your password
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-300 text-sm mb-6">
          Enter your email and we’ll send you a reset link.
        </p>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg dark:placeholder-white 
            dark:text-white focus:outline-none focus:ring"
          />

          <button
            type="submit"
            className="bg-black dark:bg-white text-white dark:text-black 
            py-3 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-200 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPass;
