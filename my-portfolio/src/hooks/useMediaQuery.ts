import {useCallback, useSyncExternalStore} from 'react';
import {MOBILE_QUERY, REDUCED_MOTION_QUERY} from '@app/common/constants/mediaQueries';

/** Returns whether the media query matches, and re-renders when that changes. */
export function useMediaQuery(query: string): boolean {
    const subscribe = useCallback(
        (onChange: () => void) => {
            const mediaQueryList = window.matchMedia(query);
            mediaQueryList.addEventListener('change', onChange);
            return () => mediaQueryList.removeEventListener('change', onChange);
        },
        [query],
    );
    const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
    return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function usePrefersReducedMotion(): boolean {
    return useMediaQuery(REDUCED_MOTION_QUERY);
}

export function useIsMobile(): boolean {
    return useMediaQuery(MOBILE_QUERY);
}
