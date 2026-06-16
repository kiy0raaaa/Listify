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
    <form onSubmit={submit} className="item-form create-item-form">
    <h3 className="item-form-title">
        Tambah Item
    </h3>

    <Input
        value={form.name}
        onChange={(e) =>
        setForm((prev) => ({
            ...prev,
            name: e.target.value,
        }))
        }
        placeholder="Nama barang"
        className="item-input"
    />

    <Input
        value={form.link}
        onChange={(e) =>
        setForm((prev) => ({
            ...prev,
            link: e.target.value,
        }))
        }
        placeholder="Link Shopee / TikTok Shop"
        className="item-input"
    />

    <Input
        type="number"
        value={form.price}
        onChange={(e) =>
        setForm((prev) => ({
            ...prev,
            price: e.target.value,
        }))
        }
        placeholder="Harga"
        className="item-input"
    />

    <select
        value={form.status}
        onChange={(e) =>
        setForm((prev) => ({
            ...prev,
            status: e.target.value,
        }))
        }
        className="item-status-select"
    >
        {ITEM_STATUS_OPTIONS.map((status) => (
        <option
            key={status}
            value={status}
        >
            {status}
        </option>
        ))}
    </select>

    <Button
        type="submit"
        className="item-submit-btn"
    >
        Tambah Item
    </Button>
    </form>
    );
}
