import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./routes";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <AppRouter />
    </div>
  );
}

export default App;
