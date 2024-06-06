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
  const [showActivity, setShowActivity] = useState(false);

  useEffect(() => {
    if (
      location.pathname.includes("dashboard") ||
      location.pathname.includes("admin")
    ) {
      setContainsDashboard(true);
    } else {
      setContainsDashboard(false);
    }
  }, [location.pathname]);

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

  return (
    <div className="App relative z-10 bg-background-light text-dark dark:bg-background-dark  dark:text-background-light ">
      <AppStateProvider>
        <div className="relative z-50">
          {containsDashboard ? <DashboardNav /> : <Nav />}
        </div>
        <main className="pt-20 -z-10 relative">
          <RouterIndex />
        </main>
        {containsDashboard ? <DashboardFooter /> : <Footer />}
      </AppStateProvider>

      <div className="fixed  bottom-0 right-0 p-3 round">
        <GradientDiv col1="darkgray" col2="#dbf5b3" direction="to bottom">
          {showActivity && <NftsActivity />}
        </GradientDiv>
      </div>
    </div>
  );
}

export default App;
