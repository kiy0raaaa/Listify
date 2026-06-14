import { NOTE_STATUS_OPTIONS } from '../../utils/constants';

export default function StatusFilter({ value, onChange }) {
    return (
        <div className="flex flex-wrap gap-2">
        {NOTE_STATUS_OPTIONS.map((status) => (
            <button
            key={status}
            onClick={() => onChange(status)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
                value === status ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-900'
            }`}
            >
            {status}
            </button>
        ))}
        </div>
    );
}