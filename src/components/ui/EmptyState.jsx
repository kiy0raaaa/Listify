export default function EmptyState({ title, description, action }) {
    return (
        <div className="item-list-card">
        <h3 className="item-title">{title}</h3>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
        {action && <div className="mt-4">{action}</div>}
        </div>
    );
}