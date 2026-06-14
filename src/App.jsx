import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NoteDetail from './pages/NoteDetail';
import Settings from './pages/Settings';

export default function App() {
    return (
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notes/:noteId" element={<NoteDetail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}