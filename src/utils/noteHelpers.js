export function makeId() {
    return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now() + Math.random());
}

export function createItem({
    name = '',
    link = '',
    price = 0,
    status = 'Wishlist',
    createdAt = new Date().toISOString(),
} = {}) {
    return {
    id: makeId(),
    name,
    link,
    price: Number(price || 0),
    status,
    createdAt,
    };
}

export function createNote({
    title = '',
    description = '',
    items = [],
    createdAt = new Date().toISOString(),
} = {}) {
    return {
    id: makeId(),
    title,
    description,
    items,
    createdAt,
    };
}

export function findNoteById(notes, noteId) {
    return notes.find((note) => note.id === noteId) || null;
}

export function searchNotes(notes, query) {
    const q = String(query || '').trim().toLowerCase();
    if (!q) return notes;

    return notes.filter((note) => {
    const noteMatch =
        note.title.toLowerCase().includes(q) ||
        note.description.toLowerCase().includes(q);

    const itemMatch = note.items.some((item) =>
        [item.name, item.link, item.status].some((field) =>
        String(field).toLowerCase().includes(q)
        )
    );

    return noteMatch || itemMatch;
    });
}

export function filterItems(items, { search = '', status = 'All' } = {}) {
    const q = String(search || '').trim().toLowerCase();

    return items.filter((item) => {
    const matchesSearch =
        !q ||
        [item.name, item.link, item.status].some((field) =>
        String(field).toLowerCase().includes(q)
        );

    const matchesStatus = status === 'All' || item.status === status;

    return matchesSearch && matchesStatus;
    });
}