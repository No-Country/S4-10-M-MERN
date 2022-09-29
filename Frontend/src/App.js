import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./Router";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
