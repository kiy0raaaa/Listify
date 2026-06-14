function escapeCSV(value) {
    const text = String(value ?? '');
    if (text.includes(',') || text.includes('"') || text.includes('\n')) {
    return `"${text.replaceAll('"', '""')}"`;
    }
    return text;
}

export function notesToCSV(notes = []) {
    const rows = [
    [
        'Note Title',
        'Note Description',
        'Item Name',
        'Item Link',
        'Item Price',
        'Item Status',
        'Item Created At',
    ],
    ];

    tes.forEach((note) => {
    if (!note.items.length) {
        rows.push([note.title, note.description, '', '', '', '', '']);
        return;
    }

    note.items.forEach((item) => {
        rows.push([
            note.title,
            note.description,
            item.name,
            item.link,
            item.price,
            item.status,
            item.createdAt,
        ]);
    });
    });

    return rows.map((row) => row.map(escapeCSV).join(',')).join('\n');
}

export function downloadTextFile(filename, content, mimeType = 'text/plain;charset=utf-8') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

export function exportNotesAsCSV(notes) {
    const csv = notesToCSV(notes);
    downloadTextFile('shopping-notes-export.csv', csv, 'text/csv;charset=utf-8');
}

export function exportNotesAsJSON(notes) {
    const json = JSON.stringify(notes, null, 2);
    downloadTextFile('shopping-notes-export.json', json, 'application/json;charset=utf-8');
}