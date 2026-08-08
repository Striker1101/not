import "./App.css";
import RouterIndex from "./RouterIndex";
import Nav from "./pages/comp/Nav";
import Footer from "./pages/comp/Footer";
import { AppStateProvider } from "./AppStateContext";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardNav from "./pages/comp/DashbaordNav";
import DashboardFooter from "./pages/comp/DashboardFooter";
import NftsActivity from "./NftActivity";
import GradientDiv from "./components/vendor/Card/GradientDiv";
function App() {
  const location = useLocation();

  const [containsDashboard, setContainsDashboard] = useState(false);
  const [containsAdmin, setContainsAdmin] = useState(false);
  const [showActivity, setShowActivity] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("dashboard")) {
      setContainsDashboard(true);
      setContainsAdmin(false);
    } else if (location.pathname.includes("admin")) {
      setContainsDashboard(false);
      setContainsAdmin(true);
    } else {
      setContainsDashboard(false);
      setContainsAdmin(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (containsAdmin) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#0b0f19";
    } else {
      const theme = localStorage.getItem("theme");
      if (theme !== "dark") {
        document.documentElement.classList.remove("dark");
      }
      document.body.style.backgroundColor = "";
    }
  }, [containsAdmin]);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowActivity((prev) => !prev);

      // Generate a random time between 1 and 8 minutes (converted to milliseconds)
      const randomTime =
        Math.floor(Math.random() * (5 - 1 + 1) + 1) * 60 * 1000;

      setTimeout(toggleVisibility, randomTime);
    };

    // Start the cycle
    toggleVisibility();

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(toggleVisibility);
  }, []);

  useEffect(() => {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    (function(){
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/6a325d25397ab51d44062af6/1jrabnn0a';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return (
    <div className={`App relative z-10 min-h-screen ${containsAdmin ? "dark bg-[#0b0f19] text-white" : "bg-background-light text-dark dark:bg-background-dark  dark:text-background-light"}`}>
      <AppStateProvider>
        {!containsAdmin && (
          <div className="relative z-50">
            {containsDashboard ? <DashboardNav /> : <Nav />}
          </div>
        )}
        <main className={`relative -z-10 ${containsAdmin ? "pt-0" : "pt-20"}`}>
          <RouterIndex />
        </main>
        {!containsAdmin && (containsDashboard ? <DashboardFooter /> : <Footer />)}
      </AppStateProvider>

      {!containsAdmin && (
        <div className="fixed  bottom-0 right-0 p-3 round">
          <GradientDiv col1="darkgray" col2="#dbf5b3" direction="to bottom">
            {showActivity && <NftsActivity />}
          </GradientDiv>
        </div>
      )}
    </div>
  );
}

export default App;
