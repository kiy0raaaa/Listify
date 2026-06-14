import { createContext, useEffect, useMemo, useState } from 'react';
import { THEME_KEY, THEME_OPTIONS } from '../utils/constants';
import { loadJSON, saveJSON } from '../services/localStorageService';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() =>
    loadJSON(THEME_KEY, THEME_OPTIONS.LIGHT)
    );

    useEffect(() => {
    saveJSON(THEME_KEY, theme);
    }, [theme]);

    const value = useMemo(
    () => ({
        theme,
        isDark: theme === THEME_OPTIONS.DARK,
        setTheme,
        toggleTheme: () =>
        setTheme((prev) =>
            prev === THEME_OPTIONS.DARK ? THEME_OPTIONS.LIGHT : THEME_OPTIONS.DARK
        ),
    }),
    [theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}