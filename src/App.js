import "./App.css";
import RouterIndex from "./RouterIndex";
import Nav from "./pages/comp/Nav";
import Footer from "./pages/comp/Footer";
import { AppStateProvider } from "./AppStateContext";
import Alert from "./components/vendor/alert/Alert";
import { useAppState } from "./AppStateContext";

function App() {
  return (
    <div className="App bg-background-light text-dark dark:bg-background-dark  dark:text-background-light ">
      <AppStateProvider>
        <Nav />
        <main className="pt-20 z-0">
          <RouterIndex />
        </main>
        <Footer />
      </AppStateProvider>
    </div>
  );
}

export default App;
