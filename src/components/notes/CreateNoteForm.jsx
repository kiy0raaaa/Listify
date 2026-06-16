import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function CreateNoteForm({ onCreate }) {
    const [form, setForm] = useState({
        title: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (!form.title.trim()) return;

        onCreate({
        title: form.title.trim(),
        description: form.description.trim(),
        });

        setForm({ title: '', description: '' });
    };

    return (
        <form onSubmit={submit} className="new-notes">
        <h3 className="judul">Buat Notes Baru</h3>

        <Input
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Nama notes"
        />

        <textarea
            value={form.description}
            onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Deskripsi notes"
            rows={3}
            className="description"
        />

        <Button type="submit">Tambah Notes</Button>
        </form>
    );
}