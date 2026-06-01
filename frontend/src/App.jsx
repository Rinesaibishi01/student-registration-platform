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
import EnrolledStudents from "./pages/Dashboard/EnrolledStudents";
import LendetMia from "./pages/Dashboard/LendetMia";

import RegisterCourse from "./pages/Dashboard/RegisterCourse";
import Schedule from "./pages/Dashboard/Schedule";
import Messages from "./pages/Dashboard/Messages";

// Importet e skedarëve për Dashboard-in e Profesorit
import CreateAnnouncement from "./pages/Dashboard/CreateAnnouncement";
import ProfessorSchedule from "./pages/Dashboard/ProfessorSchedule";

// Importi i ri për shtimin e orarit nga Admini
import AddSchedule from "./pages/Dashboard/AddSchedule";

import AdminDepartments from './pages/Dashboard/AdminDepartments'; 
import AdminWaitingList from './pages/Dashboard/AdminWaitingList';

// Komponenti i mbrojtjes 
const ProtectedRoute = ({ children, allowedRole, allowedRoles }) => {
  const userRole = localStorage.getItem("role");
  
  console.log("Mbrojtja - Roli aktual:", userRole);

  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  const roleToCheck = userRole.toLowerCase().trim();

  // Kontrolli nëse është përdorur allowedRoles={["student"]}
  if (allowedRoles && !allowedRoles.map(r => r.toLowerCase().trim()).includes(roleToCheck)) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && roleToCheck !== allowedRole.toLowerCase().trim()) {
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

        <Route 
          path="/add-schedule" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AddSchedule />
            </ProtectedRoute>
          } 
        />

        {/* 3. RRUGËT E STUDENTIT - TANI JANË STRUKTURUAR BRENDA <ROUTES> */}
        <Route 
          path="/student-panel" 
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/student-dashboard" 
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard /> 
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/register-course" 
          element={
            <ProtectedRoute allowedRole="student">
              <RegisterCourse />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/schedule" 
          element={
            <ProtectedRoute allowedRole="student">
              <Schedule />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/messages" 
          element={
            <ProtectedRoute allowedRole="student">
              <Messages />
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

        {/* Rrugët  për Departamentet dhe Listën e Pritjes */}
        <Route path="/departments" element={<AdminDepartments />} />
        <Route path="/waiting-list" element={<AdminWaitingList />} />

<Route 
  path="/EnrolledStudents" 
  element={
    <ProtectedRoute allowedRole="professor">
      <EnrolledStudents />
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
        
        {/* 5. CATCH-ALL (Duhet të jetë gjithmonë e fundit fare brenda <Routes>) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;