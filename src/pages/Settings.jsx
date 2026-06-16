import useNotes from '../hooks/useNotes';
import useTheme from '../hooks/useTheme';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import { exportNotesAsCSV, exportNotesAsJSON } from '../services/exportService';

export default function Settings() {
    const { notes, loading, error } = useNotes();
    const { theme, isDark, toggleTheme } = useTheme();

    if (loading) {
        return (
            <div className={`min-h-screen p-4 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className="mx-auto max-w-4xl space-y-6 flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen p-4 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className="mx-auto max-w-4xl space-y-6 flex items-center justify-center">
                <div className="text-lg text-red-500">Error: {error}</div>
            </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen p-4 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
        <div className="mx-auto max-w-4xl space-y-6">
            <Header
            title="Settings"
            subtitle="Pengaturan dasar dan export data."
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
            </div>
        </div>
        </div>
    );
}