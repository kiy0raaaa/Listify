import ProgressBar from '../ui/ProgressBar';
import { calculateProgress } from '../../utils/calculateProgress';

export default function NoteProgress({ items = [] }) {
    const progress = calculateProgress(items);

    return (
        <div className="rounded-2xl border p-4">
        <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-slate-500">Progress</p>
            <p className="font-semibold">{progress}%</p>
        </div>
        <ProgressBar value={progress} />
        </div>
    );
}