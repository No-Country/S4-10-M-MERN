import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./Router";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
