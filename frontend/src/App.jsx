import { Routes, Route } from "react-router-dom";
import Students from "./pages/Students.jsx";
import Register from "./pages/Register.jsx";

function App() {
  return (
    <Routes>
      {/* Kjo tani bëhet faqja kryesore (Home) */}
      <Route path="/" element={<Students />} /> 
      
      {/* Kjo bëhet faqja që hapet te /register */}
      <Route path="/register" element={<Register />} /> 
    </Routes>
  );
}

export default App;