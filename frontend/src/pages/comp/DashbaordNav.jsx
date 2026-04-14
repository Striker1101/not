import React, { useEffect, useState } from "react";
import SVGHolder from "../../components/vendor/svg/SVGHolder";
import { Link } from "react-router-dom";
import DashBoardLinks from "./DashBoardLinks";
import { useAppState } from "../../AppStateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGears } from "@fortawesome/free-solid-svg-icons";
library.add(faGears);

const DashboardNav = () => {
  const { islogged } = useAppState();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
      scrolled ? "py-2" : "py-4"
    }`}>
      <div className={`mx-4 lg:mx-8 px-4 py-2 rounded-2xl glass-card flex justify-between items-center shadow-lg border-white/10 ${
        scrolled ? "bg-opacity-90 shadow-xl" : ""
      }`}>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative"
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-gray-300 transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
            <span className="absolute -bottom-8 left-0 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">MENU</span>
          </button>
          
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-500/30">D</div>
             <h1 className="text-lg font-bold gradient-text hidden sm:block">Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-6">
          <Link
            to={"/dashboard/upload"}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-105 transition-all duration-200 active:scale-95"
          >
            <span className="text-xl leading-none">+</span>
            <span>New Project</span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
            >
              {darkMode ? (
                <SVGHolder name={"light"} color={"#FBBF24"} className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              ) : (
                <SVGHolder name={"dark"} color={"#4B5563"} className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
              )}
            </button>

            {islogged.user.uid === "YvAAxZB4rXOr9pZM5XgYNBjLyO53" ? (
              <Link to={"/admin/"} className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                <FontAwesomeIcon icon="fa-solid fa-gears" className="text-blue-500 text-lg" spin />
              </Link>
            ) : (
              <Link to={"/dashboard/profile"} className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl hover:ring-2 ring-blue-500/30 transition-all group overflow-hidden relative">
                <svg className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            )}
            
            <div id="google_translate_element" className="scale-75 origin-right"></div>
          </div>
        </div>
      </div>

      {/* Side Bar Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Side Bar Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-[120] w-80 glass-card rounded-r-3xl border-none shadow-2xl transform transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-8 border-b border-gray-100 dark:border-gray-800/50">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-xl shadow-blue-600/20">D</div>
             <h2 className="text-xl font-black tracking-tight gradient-text">NAVIGATOR</h2>
          </div>
          <button onClick={toggleSidebar} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
             <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="h-[calc(100%-100px)]">
           <DashBoardLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
