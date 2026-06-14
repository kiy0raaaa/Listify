import { createContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEY } from '../utils/constants';
import { sampleData } from '../data/sampleData';
import { loadJSON, saveJSON, removeKey } from '../services/localStorageService';
import { createItem, createNote } from '../utils/noteHelpers';

export const NotesContext = createContext(null);

export function NotesProvider({ children }) {
    const [notes, setNotes] = useState(() => {
        const stored = loadJSON(STORAGE_KEY, null);
        return Array.isArray(stored) && stored.length ? stored : sampleData;
    });

    useEffect(() => {
        saveJSON(STORAGE_KEY, notes);
    }, [notes]);

    const addNote = ({ title, description }) => {
        const note = createNote({ title, description, items: [] });
        setNotes((prev) => [note, ...prev]);
        return note;
    };

    const updateNote = (noteId, patch) => {
        setNotes((prev) =>
        prev.map((note) => (note.id === noteId ? { ...note, ...patch } : note))
        );
    };

    const deleteNote = (noteId) => {
        setNotes((prev) => prev.filter((note) => note.id !== noteId));
    };

    const replaceNotes = (nextNotes) => {
        setNotes(Array.isArray(nextNotes) ? nextNotes : []);
    };

    const addItem = (noteId, itemData) => {
        const item = createItem(itemData);

        setNotes((prev) =>
        prev.map((note) =>
            note.id === noteId ? { ...note, items: [item, ...note.items] } : note
        )
        );

        return item;
    };

    const updateItem = (noteId, itemId, patch) => {
        setNotes((prev) =>
        prev.map((note) => {
            if (note.id !== noteId) return note;

            return {
            ...note,
            items: note.items.map((item) =>
                item.id === itemId ? { ...item, ...patch } : item
            ),
            };
        })
        );
    };

    const deleteItem = (noteId, itemId) => {
        setNotes((prev) =>
        prev.map((note) => {
            if (note.id !== noteId) return note;
            return {
            ...note,
            items: note.items.filter((item) => item.id !== itemId),
            };
        })
        );
    };

    const resetNotes = () => {
        setNotes(sampleData);
        removeKey(STORAGE_KEY);
    };

    const value = useMemo(
        () => ({
        notes,
        setNotes: replaceNotes,
        addNote,
        updateNote,
        deleteNote,
        resetNotes,
        addItem,
        updateItem,
        deleteItem,
        }),
        [notes]
    );

    return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}