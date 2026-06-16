import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useNotes from '../hooks/useNotes';
import useTheme from '../hooks/useTheme';
import { filterItems, searchNotes } from '../utils/noteHelpers';
import { calculateProgress } from '../utils/calculateProgress';
import Header from '../components/layout/Header';
import DashboardStats from '../components/layout/DashboardStats';
import SearchBar from '../components/filters/SearchBar';
import StatusFilter from '../components/filters/StatusFilter';
import NoteList from '../components/notes/NoteList';
import CreateNoteForm from '../components/notes/CreateNoteForm';
import { exportNotesAsCSV, exportNotesAsJSON } from '../services/exportService';

export default function Dashboard() {
    const { notes, loading, error, addNote, deleteNote } = useNotes();
    const { theme, isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const searchedNotes = useMemo(() => searchNotes(notes, search), [notes, search]);

    const filteredNotes = useMemo(() => {
        return searchedNotes.map((note) => ({
        ...note,
        items: filterItems(note.items, { search, status: statusFilter }),
        }));
    }, [searchedNotes, search, statusFilter]);

    const stats = useMemo(() => {
        const totalNotes = notes.length;
        const totalItems = notes.reduce((sum, note) => sum + note.items.length, 0);
        const boughtItems = notes.reduce(
        (sum, note) => sum + note.items.filter((item) => item.status === 'Bought').length,
        0
        );
        const totalValue = notes.reduce(
        (sum, note) =>
            sum + note.items.reduce((noteSum, item) => noteSum + Number(item.price || 0), 0),
        0
        );

        return {
        totalNotes,
        totalItems,
        boughtItems,
        totalValue,
        progress: calculateProgress(notes.flatMap((note) => note.items)),
        };
    }, [notes]);

    const handleAddNote = async (noteData) => {
        try {
            const newNote = await addNote(noteData);
            navigate(`/notes/${newNote.id}`);
        } catch (err) {
            console.error('Error adding note:', err);
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            await deleteNote(noteId);
        } catch (err) {
            console.error('Error deleting note:', err);
        }
    };

    const handleSelectNote = (noteId) => {
        navigate(`/notes/${noteId}`);
    };

    if (loading) {
        return (
            <div className={`dashboard-page${isDark ? ' is-dark' : ''}`}>
            <div className="dashboard-container flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading notes...</div>
            </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`dashboard-page${isDark ? ' is-dark' : ''}`}>
            <div className="dashboard-container flex items-center justify-center min-h-screen">
                <div className="text-lg text-red-500">Error: {error}</div>
            </div>
            </div>
        );
    }

    return (
        <div className={`dashboard-page${isDark ? ' is-dark' : ''}`}>
        <div className="dashboard-container">
            <Header
            title="LISTIFY"
            subtitle="Catat barang yang mau dibeli, yang sedang diproses, dan yang sudah berhasil kamu beli."
            isDark={theme === 'dark'}
            onToggleTheme={toggleTheme}
            onExportCSV={() => exportNotesAsCSV(notes)}
            onExportJSON={() => exportNotesAsJSON(notes)}
            />

            <DashboardStats stats={stats} />

            <section className="all">
            <div className="all-notes">
                <CreateNoteForm onCreate={handleAddNote} />
                <SearchBar value={search} onChange={setSearch} placeholder="Search notes / item / link..." />
                <StatusFilter value={statusFilter} onChange={setStatusFilter} />
                <NoteList
                notes={filteredNotes}
                onSelectNote={handleSelectNote}
                onDeleteNote={handleDeleteNote}
                />
            </div>
            </section>
        </div>
        </div>
    );
}
