// A const object instead of an enum: the project compiles with `erasableSyntaxOnly`.
export const ScreenId = {
    HOME: 'home',
    ABOUT: 'about',
    SKILLS: 'skills',
    PROJECTS: 'projects',
    CONTACT: 'contact',
} as const;

export type ScreenId = (typeof ScreenId)[keyof typeof ScreenId];

/** Order used by the previous/next keys. */
export const SCREEN_ORDER: readonly ScreenId[] = [
    ScreenId.HOME,
    ScreenId.ABOUT,
    ScreenId.SKILLS,
    ScreenId.PROJECTS,
    ScreenId.CONTACT,
];

/** Keypad digit (and keyboard key) that opens each screen. */
export const SCREEN_KEYS: Record<ScreenId, string> = {
    [ScreenId.HOME]: '0',
    [ScreenId.ABOUT]: '1',
    [ScreenId.SKILLS]: '2',
    [ScreenId.PROJECTS]: '3',
    [ScreenId.CONTACT]: '4',
};

export function isScreenId(value: string): value is ScreenId {
    return (SCREEN_ORDER as readonly string[]).includes(value);
}
