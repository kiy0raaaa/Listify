export function loadJSON(key, fallbackValue) {
    try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallbackValue;
    return JSON.parse(raw);
    } catch {
    return fallbackValue;
    }
}

export function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function removeKey(key) {
    localStorage.removeItem(key);
}