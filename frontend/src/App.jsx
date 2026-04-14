import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home"; 
import DashboardStudents from "./pages/Dashboard/Students";
import EditStudent from "./pages/Dashboard/EditStudent";
import StudentDashboard from "./pages/Dashboard/StudentDashboard"; 
import DashboardTeachers from "./pages/Dashboard/DashboardTeachers";

<Route path="/teachers" element={<DashboardTeachers />} />

const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = localStorage.getItem("role"); 

  // Nëse nuk ka rol, kthehu në ballinë
  if (!userRole) {
    return <Navigate to="/" />; 
  }

  // Kontrolli pa pasur parasysh shkronjat e mëdha/vogla
  if (userRole.toLowerCase() !== allowedRole.toLowerCase()) {
    console.warn("Roli nuk përputhet:", userRole, "vs", allowedRole);
    return <Navigate to="/" />; 
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rrugët publike */}
        <Route path="/" element={<Home />} />

        {/* Rrugët për ADMIN - E rregulluar në /dashboard/students */}
        <Route 
          path="/dashboard/students" 
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardStudents />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/edit/:id" 
          element={
            <ProtectedRoute allowedRole="admin">
              <EditStudent />
            </ProtectedRoute>
          } 
        />

        {/* Rrugët për STUDENTË */}
        <Route 
          path="/student-panel" 
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
