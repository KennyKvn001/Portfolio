import {useCallback, useEffect, useState} from 'react';
import {isScreenId, SCREEN_KEYS, SCREEN_ORDER, ScreenId} from '@app/views/home/types/screenId';

function readScreenFromHash(): ScreenId {
    const hash = window.location.hash.slice(1);
    return isScreenId(hash) ? hash : ScreenId.HOME;
}

function isTypingTarget(target: EventTarget | null): boolean {
    return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
}

/**
 * Which screen the device shows. Keeps it in the URL hash so a screen can be linked, and maps the
 * keyboard: digits open screens, left/right arrows step through them.
 */
export function useScreenNavigation() {
    const [screen, setScreen] = useState<ScreenId>(readScreenFromHash);

    const showAdjacentScreen = useCallback((step: number) => {
        setScreen((current) => {
            const index = SCREEN_ORDER.indexOf(current);
            return SCREEN_ORDER[(index + step + SCREEN_ORDER.length) % SCREEN_ORDER.length];
        });
    }, []);

    useEffect(() => {
        const url = screen === ScreenId.HOME ? window.location.pathname : `#${screen}`;
        window.history.replaceState(null, '', url);
    }, [screen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.altKey || event.ctrlKey || event.metaKey || isTypingTarget(event.target)) {
                return;
            }
            const screenForKey = SCREEN_ORDER.find((id) => SCREEN_KEYS[id] === event.key);
            if (screenForKey) {
                setScreen(screenForKey);
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                showAdjacentScreen(event.key === 'ArrowLeft' ? -1 : 1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showAdjacentScreen]);

    return {screen, showScreen: setScreen, showAdjacentScreen};
}
