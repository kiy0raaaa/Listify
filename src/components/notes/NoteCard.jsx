import { calculateProgress } from '../../utils/calculateProgress';
import { formatCurrency } from '../../utils/formatCurrency';
import ProgressBar from '../ui/ProgressBar';

export default function NoteCard({ note, active = false, onSelect, onDelete }) {
    const progress = calculateProgress(note.items);
    const totalValue = note.items.reduce((sum, item) => sum + Number(item.price || 0), 0);

    return (
        <div
        className={`rounded-2xl border p-4 ${
            active ? 'border-slate-900 bg-slate-50' : ''
        }`}
        >
        <div className="flex items-start justify-between gap-3">
            <button onClick={onSelect} className="text-left">
            <h3 className="text-lg font-semibold">{note.title}</h3>
            <p className="mt-1 text-sm text-slate-500">
                {note.description || 'No description'}
            </p>
            </button>

            <button onClick={onDelete} className="text-sm text-rose-600">
            Delete
            </button>
        </div>

        <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">{note.items.length} items</span>
            <span className="font-medium">{progress}%</span>
            </div>

            <ProgressBar value={progress} />

            <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Total</span>
            <span className="font-medium">{formatCurrency(totalValue)}</span>
            </div>
        </div>
        </div>
    );
}