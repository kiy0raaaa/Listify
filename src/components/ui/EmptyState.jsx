export default function EmptyState({ title, description, action }) {
    return (
        <div className="rounded-2xl border p-6 text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
        {action && <div className="mt-4">{action}</div>}
        </div>
    );
}