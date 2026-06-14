import ItemStatusBadge from './ItemStatusBadge';
import Button from '../ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { ITEM_STATUS_OPTIONS } from '../../utils/constants';

export default function ItemCard({ noteId, item, onUpdate, onDelete }) {
    return (
        <div className="rounded-2xl border p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="space-y-1">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <a
                href={item.link || '#'}
                target="_blank"
                rel="noreferrer"
                className="break-all text-sm text-slate-600 underline"
            >
                {item.link || 'No link'}
            </a>
            <p className="text-sm text-slate-500">
                Added: {new Date(item.createdAt).toLocaleDateString('id-ID')}
            </p>
            </div>

            <div className="flex flex-col items-start gap-2 md:items-end">
            <p className="text-xl font-bold">{formatCurrency(item.price)}</p>
            <ItemStatusBadge status={item.status} />

            <select
                value={item.status}
                onChange={(e) => onUpdate(noteId, item.id, { status: e.target.value })}
                className="rounded-xl border px-3 py-2"
            >
                {ITEM_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                    {status}
                </option>
                ))}
            </select>

            <Button variant="danger" onClick={() => onDelete(noteId, item.id)}>
                Delete
            </Button>
            </div>
        </div>
        </div>
    );
}