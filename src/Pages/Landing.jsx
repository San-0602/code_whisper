import { useNavigate } from "react-router-dom";
import { useContext, useRef, useEffect } from "react";
import { ThemeContext } from "../ThemeContext";
import { Sun, Moon } from "lucide-react";


export default function LandingPage() {
  const navigate = useNavigate();
  const { dark, setDark } = useContext(ThemeContext);



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black/90 text-gray-900 dark:text-gray-100 transition-colors duration-500 ease-in-out">
      {/* NAVBAR */}

      <header className="w-full px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          
          <div className="text-lg font-semibold">Code Whisperer</div>
        </div>

        <nav className="flex items-center gap-4">
          <button
        onClick={() => setDark(!dark)}
        className="flex items-center gap-2 px-3 py-1 rounded-md border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        {dark ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
        <span className="hidden sm:inline text-sm">
          {dark ? "Dark" : "Light"}
        </span>
      </button>

          <button
            href="#get-started"
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:scale-105 hover:shadow-lg transition-transform duration-300"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* HERO */}
      <main className="mt-15 max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-30">
        <section className="flex-1">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight animate-fadeIn">
            Code Whisperer
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl animate-fadeIn delay-150">
            Write code. Fix mistakes instantly. Learn faster. Code Whisperer
            analyses your code in real-time, auto-fixes common errors, and
            generates challenges tailored to your weak spots — so you actually
            get better instead of just copy-pasting StackOverflow.
          </p>


          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl animate-fadeIn delay-500">
            <div className="p-4 bg-white dark:bg-black/50 rounded-lg border dark:border-gray-700 hover:scale-105 transition">
              <h4 className="font-semibold">Instant Fixes</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Auto-correct syntax and logical errors as you type.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-black/50 rounded-lg border dark:border-gray-700 hover:scale-105 transition">
              <h4 className="font-semibold">Personal Challenges</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Custom tasks targeting gaps in your skills.
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-black/50 rounded-lg border dark:border-gray-700 hover:scale-105 transition">
              <h4 className="font-semibold">AI Assistant</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Explain fixes, suggest improvements, and help you grow.
              </p>
            </div>
          </div>
        </section>

        <aside className="flex-1 w-full animate-slideIn">
          <div className="w-full rounded-2xl p-6 bg-gray-100 dark:bg-black/30 border dark:border-gray-700 shadow-md">
            <div className="font-mono text-sm bg-white dark:bg-black bg-opacity-5 dark:bg-opacity-20 rounded-md p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs">playground</div>
                <div className="text-xs opacity-60">JS • run</div>
              </div>

              <pre className="text-sm text-black dark:text-white bg-white dark:bg-black leading-tight whitespace-pre-wrap">{`function greet(name) {
  console.log('Hello ' + name)
}

greet('World')
`}</pre>

              <div className="mt-4 flex items-center gap-3">
                <button className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm hover:scale-105 transition">
                  Run
                </button>
                <button className="px-3 py-1 rounded-md border text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  Fix
                </button>
                <button className="px-3 py-1 rounded-md border text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  Challenge
                </button>
              </div>
            </div>
          </div>
        </aside>
      </main>


      <footer className="py-8 mt-30 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Code Whisperer. Built with ❤️ and caffeine.
      </footer>
    </div>
  );
}
