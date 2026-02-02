import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './home/Dashboard';
import Login from "./pages/Login";
import Navbar from "./navbar/Navbar";
import RegistrationAccont from "./pages/RegistrationAccont";
import Footer from './footer/Footer';



const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="*" element={<Login />} />
          <Route path="/RegistrationAccont" element={<RegistrationAccont />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>

  );
}

export default App;