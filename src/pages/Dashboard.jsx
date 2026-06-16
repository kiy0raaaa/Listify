import { useMemo, useState } from 'react';
import useNotes from '../hooks/useNotes';
import useTheme from '../hooks/useTheme';
import { filterItems, findNoteById, searchNotes } from '../utils/noteHelpers';
import { calculateProgress } from '../utils/calculateProgress';
import Header from '../components/layout/Header';
import DashboardStats from '../components/layout/DashboardStats';
import SearchBar from '../components/filters/SearchBar';
import StatusFilter from '../components/filters/StatusFilter';
import NoteList from '../components/notes/NoteList';
import CreateNoteForm from '../components/notes/CreateNoteForm';
import ItemList from '../components/items/ItemList';
import CreateItemForm from '../components/items/CreateItemForm';
import NoteProgress from '../components/notes/NoteProgress';
import EmptyState from '../components/ui/EmptyState';
import { exportNotesAsCSV, exportNotesAsJSON } from '../services/exportService';

export default function Dashboard() {
    const { notes, addNote, deleteNote, addItem, updateItem, deleteItem } = useNotes();
    const { theme, isDark, toggleTheme } = useTheme();

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedNoteId, setSelectedNoteId] = useState(notes[0]?.id || null);

    const searchedNotes = useMemo(() => searchNotes(notes, search), [notes, search]);

    const filteredNotes = useMemo(() => {
        return searchedNotes.map((note) => ({
        ...note,
        items: filterItems(note.items, { search, status: statusFilter }),
        }));
    }, [searchedNotes, search, statusFilter]);

    const selectedNote = useMemo(() => {
        const note = findNoteById(notes, selectedNoteId) || notes[0] || null;
        return note;
    }, [notes, selectedNoteId]);

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
                <CreateNoteForm onCreate={addNote} />
                <SearchBar value={search} onChange={setSearch} placeholder="Search notes / item / link..." />
                <StatusFilter value={statusFilter} onChange={setStatusFilter} />
                <NoteList
                notes={filteredNotes}
                selectedNoteId={selectedNoteId}
                onSelectNote={setSelectedNoteId}
                onDeleteNote={(noteId) => {
                    deleteNote(noteId);
                    if (selectedNoteId === noteId) setSelectedNoteId(notes[0]?.id || null);
                }}
                />
            </div>

            <div className="note-detail-section">
            {selectedNote ? (
                <>
                <div className="note-detail-card">
                    <h2 className="note-detail-title">
                    {selectedNote.title}
                    </h2>

                    <p className="note-detail-description">
                    {selectedNote.description || 'No description'}
                    </p>

                    <div className="note-progress-wrapper">
                    <NoteProgress items={selectedNote.items} />
                    </div>
                </div>

                <div className="item-form-section">
                    <CreateItemForm
                    onCreate={(itemData) => {
                        if (!selectedNote?.id) return;
                        addItem(selectedNote.id, itemData);
                    }}
                    />
                </div>

                <div className="item-list-section">
                    <ItemList
                    note={selectedNote}
                    onUpdateItem={updateItem}
                    onDeleteItem={deleteItem}
                    />
                </div>
                </>
            ) : (
                <div className="empty-note-state">
                <EmptyState
                    title="No notes selected"
                    description="Buat atau pilih notes dulu untuk mulai menambah item."
                />
                </div>
            )}
            </div>
            </section>
        </div>
        </div>
    );
}
