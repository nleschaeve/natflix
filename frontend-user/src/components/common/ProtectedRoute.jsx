import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    // Pour l'instant, on simule avec localStorage.
    // Plus tard, on pourra brancher la logique via Context API.
    const isAuthenticated = localStorage.getItem('user') !== null;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
