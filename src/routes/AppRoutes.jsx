import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import NoteDetail from '../pages/NoteDetail';
import Settings from '../pages/Settings';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
    return (
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
            <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
        } />
        <Route path="/notes/:noteId" element={
            <ProtectedRoute>
            <NoteDetail />
            </ProtectedRoute>
        } />
        <Route path="/settings" element={
            <ProtectedRoute>
            <Settings />
            </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
