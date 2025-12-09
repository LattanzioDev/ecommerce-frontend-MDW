import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './redux/thunks/authThunks.js';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

    console.log("AUTH =>", { isAuthenticated, loading, user });

    if (loading) return <p>Cargando...</p>;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    if (loading) return <p>Cargando...</p>;

    return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;