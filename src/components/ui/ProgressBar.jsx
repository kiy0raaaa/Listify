export default function ProgressBar({ value = 0, className = '' }) {
    return (
        <div className={`progress-wrap ${className}`}>
            <div
                className="progress-bar"
                style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
            />
        </div>
    );
}