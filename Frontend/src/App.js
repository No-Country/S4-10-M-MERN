
import "./App.css";
import SignInOutContainer from './containers';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
   <div>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>path /</h1>} />
        <Route path="/home" element={<h1>path /home</h1>} />
      </Routes>
    </BrowserRouter>

    <div className="App">
      <div className="App">
      <SignInOutContainer/> 
     

      </div>
    </div>
   </div>
   
  );
}

export default App;

