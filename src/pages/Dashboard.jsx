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
        <div className={`min-h-screen p-4 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
        <div className="mx-auto max-w-7xl space-y-6">
            <Header
            title="Shopping Notes"
            subtitle="Catat barang yang mau dibeli, yang sedang diproses, dan yang sudah berhasil kamu beli."
            isDark={theme === 'dark'}
            onToggleTheme={toggleTheme}
            onExportCSV={() => exportNotesAsCSV(notes)}
            onExportJSON={() => exportNotesAsJSON(notes)}
            />

            <DashboardStats stats={stats} />

            <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
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

            <div className="space-y-4">
                {selectedNote ? (
                <>
                    <div className="rounded-2xl border p-5">
                    <h2 className="text-2xl font-bold">{selectedNote.title}</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        {selectedNote.description || 'No description'}
                    </p>
                    <div className="mt-4">
                        <NoteProgress items={selectedNote.items} />
                    </div>
                    </div>

                    <CreateItemForm
                    onCreate={(itemData) => {
                        if (!selectedNote?.id) return;
                        addItem(selectedNote.id, itemData);
                    }}
                    />

                    <ItemList
                    note={selectedNote}
                    onUpdateItem={updateItem}
                    onDeleteItem={deleteItem}
                    />
                </>
                ) : (
                <EmptyState
                    title="No notes selected"
                    description="Buat atau pilih notes dulu untuk mulai menambah item."
                />
                )}
            </div>
            </section>
        </div>
        </div>
    );
}