import Button from '../ui/Button';

export default function Header({
    title = 'LISTIFY',
    subtitle = 'Catat barang yang kamu mau, lagi proses, atau sudah dibeli.',
    isDark = false,
    onToggleTheme,
    onExportCSV,
    onExportJSON,
    }) {
    return (
        <header className="rounded-2xl border p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
            <h1 className="mt-2 text-3xl font-bold">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">{subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-2">
            <Button onClick={onToggleTheme}>
                {isDark ? 'Light Mode' : 'Dark Mode'}
            </Button>
            <Button variant="secondary" onClick={onExportCSV}>
                Export CSV
            </Button>
            <Button variant="secondary" onClick={onExportJSON}>
                Export JSON
            </Button>
            </div>
        </div>
        </header>
    );
}