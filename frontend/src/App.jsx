import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Home from "./pages/home"; 
import DashboardStudents from "./pages/Dashboard/Students";
import EditStudent from "./pages/Dashboard/EditStudent";
import StudentDashboard from "./pages/Dashboard/StudentDashboard"; 
import DashboardTeachers from "./pages/Dashboard/DashboardTeachers";
import DashboardAdmin from "./pages/Dashboard/Dashboard-admin"; 
// KORRIGJIMI: Importi i munguar që shkaktonte faqen e bardhë
import Courses from "./pages/Dashboard/Courses"; 

// Komponenti për mbrojtjen e rrugëve
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
        {/* Rruga publike */}
        <Route path="/" element={<Home />} />

        {/* --- RRUGËT E ADMINIT (VETËM PËR ROLE='ADMIN') --- */}
        <Route 
          path="/Dashboard-admin" 
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/students" 
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardStudents />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/edit-student/:id" 
          element={
            <ProtectedRoute allowedRole="admin">
              <EditStudent />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/teachers" 
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardTeachers />
            </ProtectedRoute>
          } 
        />

        {/* SHTESA: Rruga e Kurseve e mbrojtur për Admin */}
        <Route 
          path="/courses" 
          element={
            <ProtectedRoute allowedRole="admin">
              <Courses />
            </ProtectedRoute>
          } 
        />

        {/* --- RRUGËT E STUDENTIT (VETËM PËR ROLE='STUDENT') --- */}
        <Route 
          path="/student-panel" 
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Rruga 'Catch-all' - Duhet të jetë gjithmonë e fundit */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;