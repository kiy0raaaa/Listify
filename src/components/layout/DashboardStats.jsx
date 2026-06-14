import ProgressBar from '../ui/ProgressBar';
import { formatCurrency } from '../../utils/formatCurrency';

export default function DashboardStats({ stats }) {
    const cards = [
        { label: 'Total Notes', value: stats.totalNotes },
        { label: 'Total Items', value: stats.totalItems },
        { label: 'Bought Items', value: stats.boughtItems },
        { label: 'Total Value', value: formatCurrency(stats.totalValue) },
    ];

    return (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
            <div key={card.label} className="rounded-2xl border p-4">
            <p className="text-sm text-slate-500">{card.label}</p>
            <h3 className="mt-2 text-2xl font-bold">{card.value}</h3>
            </div>
        ))}

        <div className="rounded-2xl border p-4 md:col-span-2 xl:col-span-4">
            <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-slate-500">Overall Progress</p>
            <p className="font-semibold">{stats.progress}%</p>
            </div>
            <ProgressBar value={stats.progress} />
        </div>
        </section>
    );
}