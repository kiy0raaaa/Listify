import ItemStatusBadge from './ItemStatusBadge';
import Button from '../ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { ITEM_STATUS_OPTIONS } from '../../utils/constants';

export default function ItemCard({
    noteId,
    item,
    onUpdate,
    onDelete,
    }) {
    return (
        <div className="item-card">
        <div className="item-card-content">

            <div className="item-info">
            <h3 className="item-name">
                {item.name}
            </h3>

            <a
                href={item.link || '#'}
                target="_blank"
                rel="noreferrer"
                className="item-link"
            >
                {item.link || 'No link'}
            </a>

            <p className="item-date">
                Added: {new Date(item.createdAt).toLocaleDateString('id-ID')}
            </p>
            </div>

            <div className="item-actions">

            <p className="item-price">
                {formatCurrency(item.price)}
            </p>

            <ItemStatusBadge status={item.status} />

            <select
                value={item.status}
                onChange={(e) =>
                onUpdate(noteId, item.id, {
                    status: e.target.value,
                })
                }
                className="item-status-select"
            >
                {ITEM_STATUS_OPTIONS.map((status) => (
                <option
                    key={status}
                    value={status}
                >
                    {status}
                </option>
                ))}
            </select>

            <Button
                variant="danger"
                className="item-delete-btn"
                onClick={() => onDelete(noteId, item.id)}
            >
                Delete
            </Button>

            </div>
        </div>
        </div>
    );
}
