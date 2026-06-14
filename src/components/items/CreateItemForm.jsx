import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { ITEM_STATUS_OPTIONS } from '../../utils/constants';

export default function CreateItemForm({ onCreate }) {
    const [form, setForm] = useState({
        name: '',
        link: '',
        price: '',
        status: 'Wishlist',
    });

    const submit = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;

        onCreate({
        name: form.name.trim(),
        link: form.link.trim(),
        price: Number(form.price || 0),
        status: form.status,
        });

        setForm({
        name: '',
        link: '',
        price: '',
        status: 'Wishlist',
        });
    };

    return (
        <form onSubmit={submit} className="grid gap-3 rounded-2xl border p-4 md:grid-cols-2">
        <h3 className="text-lg font-semibold md:col-span-2">Tambah Item</h3>

        <Input
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Nama barang"
        />

        <Input
            value={form.link}
            onChange={(e) => setForm((prev) => ({ ...prev, link: e.target.value }))}
            placeholder="Link Shopee / TikTok Shop"
        />

        <Input
            type="number"
            value={form.price}
            onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
            placeholder="Harga"
        />

        <select
            value={form.status}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
            className="w-full rounded-xl border px-4 py-3"
        >
            {ITEM_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
                {status}
            </option>
            ))}
        </select>

        <Button type="submit" className="md:col-span-2">
            Tambah Item
        </Button>
        </form>
    );
}