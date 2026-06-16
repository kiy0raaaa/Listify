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
import EmptyState from '../components/ui/EmptyState';

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
            <div className={`dashboard-page${isDark ? ' is-dark' : ''}`}>
            <div className="dashboard-container flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading note...</div>
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
            onExportCSV={() => {}}
            onExportJSON={() => {}}
            />

            <Button onClick={() => navigate('/')} className="mb-4">← Back to Dashboard</Button>

            {note ? (
            <>
                <div className="note-detail-card">
                <h2 className="note-detail-title">
                    {note.title}
                </h2>

                <p className="note-detail-description">
                    {note.description || 'No description'}
                </p>

                <div className="note-progress-wrapper">
                    <NoteProgress items={note.items} />
                </div>
                </div>

                <div className="item-form-section">
                <CreateItemForm
                    onCreate={handleAddItem}
                />
                </div>

                <div className="item-list-section">
                <ItemList
                    note={note}
                    onUpdateItem={handleUpdateItem}
                    onDeleteItem={handleDeleteItem}
                />
                </div>
            </>
            ) : (
            <div className="empty-note-state">
                <EmptyState
                title="Notes tidak ditemukan"
                description="Mungkin notes ini sudah dihapus atau ID-nya tidak valid."
                />
            </div>
            )}
        </div>
        </div>
    );
}