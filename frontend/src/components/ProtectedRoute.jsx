import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        // Nëse s'ka token, ktheje te faqja kryesore (Home/Login)
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(role)) {
        // Nëse roli nuk është i duhuri (psh student që tenton adminin)
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;