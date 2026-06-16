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
        <section className="stats">
            <div className="summary">
                {cards.map((card) => (
                    <div key={card.label} className="summary-card">
                        <p className="card-label">{card.label}</p>
                        <h3 className="number">{card.value}</h3>
                    </div>
                ))}
            </div>
            <div className="progress">
                <div className="progress-label">
                    <p className="overall-progress">Overall Progress</p>
                    <p className="num-progress">{stats.progress}%</p>
                </div>
                <ProgressBar value={stats.progress} />
            </div>
        </section>
    );
}
