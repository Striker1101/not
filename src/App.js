import "./App.css";
import RouterIndex from "./RouterIndex";
import Nav from "./pages/comp/Nav";
import Footer from "./pages/comp/Footer";
import { AppStateProvider } from "./AppStateContext";
import Alert from "./components/vendor/alert/Alert";
import { useAppState } from "./AppStateContext";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardNav from "./pages/comp/DashbaordNav";
import DashboardFooter from "./pages/comp/DashboardFooter";

function App() {
  const location = useLocation();

  const [containsDashboard, setContainsDashboard] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("dashboard")) {
      setContainsDashboard(true);
    } else {
      setContainsDashboard(false);
    }
  }, [location.pathname]);
  return (
    <div className="App bg-background-light text-dark dark:bg-background-dark  dark:text-background-light ">
      <AppStateProvider>
        {containsDashboard ? <DashboardNav /> : <Nav />}
        <main className="pt-20 z-0">
          <RouterIndex />
        </main>
        {containsDashboard ? <DashboardFooter /> : <Footer />}
      </AppStateProvider>
    </div>
  );
}

export default App;
