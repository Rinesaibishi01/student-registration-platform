import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home"; 
import DashboardStudents from "./pages/Dashboard/Students";
import EditStudent from "./pages/Dashboard/EditStudent";
import StudentDashboard from "./pages/Dashboard/StudentDashboard"; 
import DashboardTeachers from "./pages/Dashboard/DashboardTeachers";
// Importojmë faqen e re që krijuam për adminin
import DashboardAdmin from "./pages/Dashboard/Dashboard-admin"; 

const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = localStorage.getItem("role"); 

  if (!userRole) {
    return <Navigate to="/" />; 
  }

  if (userRole.toLowerCase() !== allowedRole.toLowerCase()) {
    return <Navigate to="/" />; 
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. FAQJA PUBLIKE */}
        <Route path="/" element={<Home />} />

        {/* 2. RRUGËT PËR ADMIN */}
        
        {/* Tani /Dashboard-admin është faqja kryesore ku do të dërgohet admini sapo të kyçet */}
        <Route 
          path="/Dashboard-admin" 
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          } 
        />

        {/* Rruga e vjetër /dashboard tani të dërgon automatikisht te faqja e re moderne */}
        <Route 
          path="/dashboard" 
          element={<Navigate to="/Dashboard-admin" />} 
        />

        <Route 
          path="/dashboard/students" 
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardStudents />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/dashboard/teachers" 
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardTeachers />
            </ProtectedRoute>
          } 
        />

        {/* Rruga për editim */}
        <Route 
          path="/edit/:id" 
          element={
            <ProtectedRoute allowedRole="admin">
              <EditStudent />
            </ProtectedRoute>
          } 
        />

        {/* 3. RRUGËT PËR STUDENTË */}
        <Route 
          path="/student-panel" 
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all: Nëse shkruhet diçka gabim, kthehu në Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;