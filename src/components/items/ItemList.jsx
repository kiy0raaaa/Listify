import ItemCard from './ItemCard';
import EmptyState from '../ui/EmptyState';

export default function ItemList({ note, onUpdateItem, onDeleteItem }) {
    if (!note) {
        return (
        <EmptyState
            title="Pilih notes dulu"
            description="Klik salah satu notes untuk melihat item di dalamnya."
        />
        );
    }

    if (!note.items.length) {
        return (
        <EmptyState
            title="Belum ada item"
            description="Tambahkan barang pertama untuk notes ini."
        />
        );
    }

    return (
        <div className="space-y-3">
        {note.items.map((item) => (
            <ItemCard
            key={item.id}
            noteId={note.id}
            item={item}
            onUpdate={onUpdateItem}
            onDelete={onDeleteItem}
            />
        ))}
        </div>
    );
}