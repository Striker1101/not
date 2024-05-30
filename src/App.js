import "./App.css";
import RouterIndex from "./RouterIndex";
import Nav from "./pages/comp/Nav";
import Footer from "./pages/comp/Footer";
import Spinner from "./components/Spinner";

function App() {
  return (
    <div className="App bg-background-light text-dark dark:bg-background-dark  dark:text-background-light ">
      {true ? (
        <>
          <Nav />
          <RouterIndex />
          <Footer />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default App;
