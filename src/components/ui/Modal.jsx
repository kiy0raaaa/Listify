import Button from './Button';

export default function Modal({
    open,
    title,
    children,
    onClose,
    footer,
    }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <Button variant="ghost" onClick={onClose}>
                ✕
            </Button>
            </div>

            <div>{children}</div>

            {footer && <div className="mt-5 flex justify-end gap-2">{footer}</div>}
        </div>
        </div>
    );
}