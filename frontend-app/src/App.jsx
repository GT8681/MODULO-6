import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Navbar from "./navbar/Navbar";
import RegistrationAccont from "./pages/RegistrationAccont";


const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
     
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="*" element={<Navigate to="/Login" />} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/RegistrationAccont" element={<RegistrationAccont/>} />


        </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;