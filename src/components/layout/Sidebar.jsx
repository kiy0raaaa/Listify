import NoteCard from '../notes/NoteCard';
import EmptyState from '../ui/EmptyState';

export default function Sidebar({
    notes,
    selectedNoteId,
    onSelectNote,
    onDeleteNote,
    }) {
    return (
        <aside className="semua">
        {notes.length ? (
            notes.map((note) => (
            <NoteCard
                key={note.id}
                note={note}
                active={note.id === selectedNoteId}
                onSelect={() => onSelectNote(note.id)}
                onDelete={() => onDeleteNote(note.id)}
            />
            ))
        ) : (
            <EmptyState
            title="Belum ada notes"
            description="Buat notes pertama kamu dulu."
            />
        )}
        </aside>
    );
}