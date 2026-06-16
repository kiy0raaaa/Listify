import ProgressBar from '../ui/ProgressBar';
import { calculateProgress } from '../../utils/calculateProgress';

export default function NoteProgress({ items = [] }) {
    const progress = calculateProgress(items);

    return (
        <div className="note-progress-card">
        <div className="note-progress-header">
            <p className="note-progress-label">
            Progress
            </p>

            <p className="note-progress-percentage">
            {progress}%
            </p>
        </div>

        <ProgressBar value={progress} />
        </div>
    );
}