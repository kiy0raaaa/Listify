import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from './AuthContext';
import { createItem, createNote } from '../utils/noteHelpers';

export const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // Listen to real-time updates from Firestore
  useEffect(() => {
    if (!currentUser) {
      setNotes([]);
      setLoading(false);
      return;
    }

    const notesRef = collection(db, 'users', currentUser.uid, 'notes');
    const q = query(notesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date(doc.data().createdAt || Date.now()),
          updatedAt: doc.data().updatedAt?.toDate?.() || new Date(doc.data().updatedAt || Date.now()),
          items: doc.data().items || [],
        }));
        setNotes(notesData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching notes:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [currentUser]);

  const addNote = async ({ title, description }) => {
    if (!currentUser) throw new Error('User not authenticated');
    const noteData = {
      title,
      description,
      items: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, 'users', currentUser.uid, 'notes'), noteData);
    return { id: docRef.id, ...noteData };
  };

  const updateNote = async (noteId, patch) => {
    if (!currentUser) throw new Error('User not authenticated');
    const noteRef = doc(db, 'users', currentUser.uid, 'notes', noteId);
    await updateDoc(noteRef, {
      ...patch,
      updatedAt: serverTimestamp(),
    });
  };

  const deleteNote = async (noteId) => {
    if (!currentUser) throw new Error('User not authenticated');
    const noteRef = doc(db, 'users', currentUser.uid, 'notes', noteId);
    await deleteDoc(noteRef);
  };

  const addItem = async (noteId, itemData) => {
    if (!currentUser) throw new Error('User not authenticated');
    const item = createItem(itemData);
    const noteRef = doc(db, 'users', currentUser.uid, 'notes', noteId);
    const noteDoc = await getDocs(collection(db, 'users', currentUser.uid, 'notes'));
    const note = noteDoc.docs.find(d => d.id === noteId);
    if (note) {
      const currentItems = note.data().items || [];
      await updateDoc(noteRef, {
        items: [item, ...currentItems],
        updatedAt: serverTimestamp(),
      });
    }
    return item;
  };

  const updateItem = async (noteId, itemId, patch) => {
    if (!currentUser) throw new Error('User not authenticated');
    const noteRef = doc(db, 'users', currentUser.uid, 'notes', noteId);
    const noteDoc = await getDocs(collection(db, 'users', currentUser.uid, 'notes'));
    const note = noteDoc.docs.find(d => d.id === noteId);
    if (note) {
      const currentItems = note.data().items || [];
      const updatedItems = currentItems.map(item =>
        item.id === itemId ? { ...item, ...patch } : item
      );
      await updateDoc(noteRef, {
        items: updatedItems,
        updatedAt: serverTimestamp(),
      });
    }
  };

  const deleteItem = async (noteId, itemId) => {
    if (!currentUser) throw new Error('User not authenticated');
    const noteRef = doc(db, 'users', currentUser.uid, 'notes', noteId);
    const noteDoc = await getDocs(collection(db, 'users', currentUser.uid, 'notes'));
    const note = noteDoc.docs.find(d => d.id === noteId);
    if (note) {
      const currentItems = note.data().items || [];
      const updatedItems = currentItems.filter(item => item.id !== itemId);
      await updateDoc(noteRef, {
        items: updatedItems,
        updatedAt: serverTimestamp(),
      });
    }
  };

  const resetNotes = async () => {
    if (!currentUser) throw new Error('User not authenticated');
    // Delete all notes and add sample data?
    // For safety, let's just log this - user can manually delete notes
    console.log('Reset notes not implemented for safety');
  };

  const value = useMemo(
    () => ({
      notes,
      loading,
      error,
      addNote,
      updateNote,
      deleteNote,
      resetNotes,
      addItem,
      updateItem,
      deleteItem,
    }),
    [notes, loading, error]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}


