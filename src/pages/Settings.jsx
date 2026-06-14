import useNotes from '../hooks/useNotes';
import useTheme from '../hooks/useTheme';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import { exportNotesAsCSV, exportNotesAsJSON } from '../services/exportService';

export default function Settings() {
    const { notes, resetNotes, setNotes } = useNotes();
    const { theme, isDark, toggleTheme } = useTheme();

    const importFromFile = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const text = await file.text();
        try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
            setNotes(parsed);
        } else {
            alert('File JSON tidak valid.');
        }
        } catch {
        alert('Gagal membaca file JSON.');
        }

        event.target.value = '';
    };

    return (
        <div className={`min-h-screen p-4 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
        <div className="mx-auto max-w-4xl space-y-6">
            <Header
            title="Settings"
            subtitle="Pengaturan dasar, export, import, dan reset data."
            isDark={theme === 'dark'}
            onToggleTheme={toggleTheme}
            onExportCSV={() => exportNotesAsCSV(notes)}
            onExportJSON={() => exportNotesAsJSON(notes)}
            />

            <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border p-5">
                <h2 className="text-xl font-semibold">Theme</h2>
                <p className="mt-2 text-sm text-slate-500">
                Toggle dark/light mode dari sini juga.
                </p>
                <Button className="mt-4" onClick={toggleTheme}>
                {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                </Button>
            </div>

            <div className="rounded-2xl border p-5">
                <h2 className="text-xl font-semibold">Import Data</h2>
                <p className="mt-2 text-sm text-slate-500">
                Import JSON hasil export dari aplikasi ini.
                </p>
                <input
                type="file"
                accept="application/json"
                onChange={importFromFile}
                className="mt-4 block w-full"
                />
            </div>

            <div className="rounded-2xl border p-5 md:col-span-2">
                <h2 className="text-xl font-semibold">Danger Zone</h2>
                <p className="mt-2 text-sm text-slate-500">
                Reset akan mengembalikan data ke sample awal.
                </p>
                <Button variant="danger" className="mt-4" onClick={resetNotes}>
                Reset to Sample Data
                </Button>
            </div>
            </div>
        </div>
        </div>
    );
}