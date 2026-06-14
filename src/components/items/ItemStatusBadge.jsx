export default function ItemStatusBadge({ status }) {
    const styles = {
        Wishlist: 'bg-slate-200 text-slate-900',
        Ordered: 'bg-amber-200 text-amber-900',
        Bought: 'bg-emerald-200 text-emerald-900',
        Cancelled: 'bg-rose-200 text-rose-900',
    };

    return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || styles.Wishlist}`}>
        {status}
        </span>
    );
}