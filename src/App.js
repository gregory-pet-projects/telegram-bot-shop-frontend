import { useEffect } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { tg } from "./utils/tg";
const App = () => {
  useEffect(() => {
    tg.ready();
  }, []);
  return (
    <div className="App">
      <Header />
    </div>
  );
};

export default App;
