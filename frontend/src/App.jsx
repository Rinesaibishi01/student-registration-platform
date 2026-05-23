import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Home from "./pages/home"; 
import DashboardStudents from "./pages/Dashboard/Students";
import EditStudent from "./pages/Dashboard/EditStudent";
import StudentDashboard from "./pages/Dashboard/StudentDashboard"; 
import DashboardTeachers from "./pages/Dashboard/DashboardTeachers";
import DashboardAdmin from "./pages/Dashboard/Dashboard-admin"; 
import Courses from "./pages/Dashboard/Courses"; 
import Semesters from "./pages/Dashboard/Semester";
import TeacherDashboard from "./pages/Dashboard/TeacherDashboard";
import Grading from "./pages/Dashboard/Grading";
import LendetMia from "./pages/Dashboard/LendetMia";

// Importet e skedarëve për Dashboard-in e Profesorit
import CreateAnnouncement from "./pages/Dashboard/CreateAnnouncement";
import ProfessorSchedule from "./pages/Dashboard/ProfessorSchedule";

// Importi i ri për shtimin e orarit nga Admini
import AddSchedule from "./pages/Dashboard/AddSchedule";

// Komponenti i përmirësuar për mbrojtjen e rrugëve
const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = localStorage.getItem("role");
  
  console.log("Mbrojtja - Roli i kërkuar:", allowedRole, "| Roli aktual:", userRole);

  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && userRole.toLowerCase().trim() !== allowedRole.toLowerCase().trim()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. RRUGA PUBLIKE */}
        <Route path="/" element={<Home />} />

        {/* 2. RRUGËT E ADMINIT */}
        <Route 
          path="/dashboard-admin" 
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

        <Route 
          path="/courses" 
          element={
            <ProtectedRoute allowedRole="admin">
              <Courses />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/semesters" 
          element={
            <ProtectedRoute allowedRole="admin">
              <Semesters />
            </ProtectedRoute>
          } 
        />

        {/* RRUGA E RE PËR SHTIMIN E ORARIT NGA ADMINI */}
        <Route 
          path="/add-schedule" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AddSchedule />
            </ProtectedRoute>
          } 
        />

        {/* 3. RRUGA E STUDENTIT */}
        <Route 
          path="/student-panel" 
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />

        {/* 4. RRUGËT E PROFESORIT */}
        <Route 
          path="/teacher-dashboard" 
          element={
            <ProtectedRoute allowedRole="professor">
              <TeacherDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/grading" 
          element={
            <ProtectedRoute allowedRole="professor">
              <Grading />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/teacher-courses" 
          element={
            <ProtectedRoute allowedRole="professor">
              <LendetMia />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/create-announcement" 
          element={
            <ProtectedRoute allowedRole="professor">
              <CreateAnnouncement />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/professor-schedule" 
          element={
            <ProtectedRoute allowedRole="professor">
              <ProfessorSchedule />
            </ProtectedRoute>
          } 
        />
        
        {/* 5. CATCH-ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;