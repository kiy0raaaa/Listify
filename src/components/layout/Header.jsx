import Button from '../ui/Button';
import UserProfile from './UserProfile';

export default function Header({
    title = 'LISTIFY',
    subtitle = 'Catat barang yang kamu mau, lagi proses, atau sudah dibeli.',
    isDark = false,
    onToggleTheme,
    onExportCSV,
    onExportJSON,
    }) {
    return (
        <header className="header">
        <div className="nav">
            <div className="label">
            <h1 className="title">{title}</h1>
            <p className="subtitle">{subtitle}</p>
            </div>

            <div className="buttons flex flex-wrap items-center gap-3">
            <Button onClick={onToggleTheme}>
                {isDark ? 'Light Mode' : 'Dark Mode'}
            </Button>
            <Button variant="secondary" onClick={onExportCSV}>
                Export CSV
            </Button>
            <Button variant="secondary" onClick={onExportJSON}>
                Export JSON
            </Button>
            <UserProfile />
            </div>
        </div>
        </header>
    );
}
