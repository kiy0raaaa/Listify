import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useNotes from '../hooks/useNotes';
import useTheme from '../hooks/useTheme';
import { findNoteById } from '../utils/noteHelpers';
import Header from '../components/layout/Header';
import NoteProgress from '../components/notes/NoteProgress';
import CreateItemForm from '../components/items/CreateItemForm';
import ItemList from '../components/items/ItemList';
import Button from '../components/ui/Button';

export default function NoteDetail() {
    const { noteId } = useParams();
    const navigate = useNavigate();
    const { notes, loading, error, addItem, updateItem, deleteItem } = useNotes();
    const { theme, isDark, toggleTheme } = useTheme();

    const note = useMemo(() => findNoteById(notes, noteId), [notes, noteId]);

    const handleAddItem = async (itemData) => {
        if (!note?.id) return;
        try {
            await addItem(note.id, itemData);
        } catch (err) {
            console.error('Error adding item:', err);
        }
    };

    const handleUpdateItem = async (itemNoteId, itemId, patch) => {
        try {
            await updateItem(itemNoteId, itemId, patch);
        } catch (err) {
            console.error('Error updating item:', err);
        }
    };

    const handleDeleteItem = async (itemNoteId, itemId) => {
        try {
            await deleteItem(itemNoteId, itemId);
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen p-4 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className="mx-auto max-w-5xl space-y-6 flex items-center justify-center">
                <div className="text-lg">Loading note...</div>
            </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen p-4 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className="mx-auto max-w-5xl space-y-6 flex items-center justify-center">
                <div className="text-lg text-red-500">Error: {error}</div>
            </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen p-4 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
        <div className="mx-auto max-w-5xl space-y-6">
            <Header
            title="Note Detail"
            subtitle="Halaman detail satu notes untuk fokus ngatur item-item di dalamnya."
            isDark={theme === 'dark'}
            onToggleTheme={toggleTheme}
            onExportCSV={() => {}}
            onExportJSON={() => {}}
            />

            <Button onClick={() => navigate('/')}>← Back to Dashboard</Button>

            {note ? (
            <>
                <div className="rounded-2xl border p-5">
                <h2 className="text-2xl font-bold">{note.title}</h2>
                <p className="mt-2 text-sm text-slate-500">
                    {note.description || 'No description'}
                </p>
                <div className="mt-4">
                    <NoteProgress items={note.items} />
                </div>
                </div>

                <CreateItemForm
                onCreate={handleAddItem}
                />

                <ItemList
                note={note}
                onUpdateItem={handleUpdateItem}
                onDeleteItem={handleDeleteItem}
                />
            </>
            ) : (
            <div className="rounded-2xl border p-6">
                <h2 className="text-xl font-semibold">Notes tidak ditemukan</h2>
                <p className="mt-2 text-sm text-slate-500">
                Mungkin notes ini sudah dihapus atau ID-nya tidak valid.
                </p>
            </div>
            )}
        </div>
        </div>
    );
}