'use client';

import { useEffect, useCallback } from 'react';

interface ShortcutHandlers {
    onSave?: () => void;
    onRun?: () => void;
    onFormat?: () => void;
}

export function useKeyboardShortcuts({ onSave, onRun, onFormat }: ShortcutHandlers) {
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const modKey = isMac ? event.metaKey : event.ctrlKey;

        // Ctrl/Cmd + S - Save
        if (modKey && event.key === 's') {
            event.preventDefault();
            onSave?.();
        }

        // Ctrl/Cmd + Enter - Run
        if (modKey && event.key === 'Enter') {
            event.preventDefault();
            onRun?.();
        }

        // Ctrl/Cmd + Shift + F - Format
        if (modKey && event.shiftKey && event.key === 'F') {
            event.preventDefault();
            onFormat?.();
        }
    }, [onSave, onRun, onFormat]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
}
