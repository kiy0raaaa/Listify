import { calculateProgress } from '../../utils/calculateProgress';
import { formatCurrency } from '../../utils/formatCurrency';
import ProgressBar from '../ui/ProgressBar';

export default function NoteCard({ note, onSelect, onDelete }) {
    const progress = calculateProgress(note.items);
    const totalValue = note.items.reduce((sum, item) => sum + Number(item.price || 0), 0);

    return (
    <div className="card">
        <div className="card-header">
        <button
            onClick={onSelect}
            className="note-btn"
        >
            <h3 className="note-title">
            {note.title}
            </h3>

            <p className="note-desc">
            {note.description || 'No description'}
            </p>
        </button>

        <button
            onClick={onDelete}
            className="delete-btn"
        >
            Delete
        </button>
        </div>

        <div className="card-body">
        <div className="item-count-row">
            <span className="item-count">
            {note.items.length} items
            </span>

            <span className="progress-text">
            {progress}%
            </span>
        </div>

        <ProgressBar value={progress} />

        <div className="total-row">
            <span className="total-label">
            Total
            </span>

            <span className="total-value">
            {formatCurrency(totalValue)}
            </span>
        </div>
        </div>
    </div>
);
}