import Input from '../ui/Input';

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
    return (
        <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        />
    );
}