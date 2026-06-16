import NoteCard from './NoteCard';
import EmptyState from '../ui/EmptyState';

export default function NoteList({
    notes,
    onSelectNote,
    onDeleteNote,
    }) {
    if (!notes.length) {
        return (
        <EmptyState
            title="Tidak ada notes yang cocok"
            description="Coba ubah search atau filter."
        />
        );
    }

    return (
        <div className="space-y-3">
        {notes.map((note) => (
            <NoteCard
            key={note.id}
            note={note}
            onSelect={() => onSelectNote(note.id)}
            onDelete={() => onDeleteNote(note.id)}
            />
        ))}
        </div>
    );
}