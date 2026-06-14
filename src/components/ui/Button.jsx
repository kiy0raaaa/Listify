export default function Button({
    children,
    variant = 'primary',
    type = 'button',
    className = '',
    ...props
    }) {
    const variants = {
        primary: 'bg-slate-900 text-white',
        secondary: 'bg-slate-200 text-slate-900',
        ghost: 'bg-transparent text-slate-900',
        danger: 'bg-rose-600 text-white',
    };

    return (
        <button
        type={type}
        className={`rounded-xl px-4 py-2 font-medium transition hover:opacity-90 ${variants[variant]} ${className}`}
        {...props}
        >
        {children}
        </button>
    );
}