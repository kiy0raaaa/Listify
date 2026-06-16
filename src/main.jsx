import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { NotesProvider } from './context/NotesContext';
import { AuthProvider } from './context/AuthContext';
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
        <AuthProvider>
        <ThemeProvider>
            <NotesProvider>
            <App />
            </NotesProvider>
        </ThemeProvider>
        </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);