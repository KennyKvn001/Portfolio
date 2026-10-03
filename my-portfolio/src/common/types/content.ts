import type {PixelIconName} from '@app/common/pixel/pixelIcons';

export interface LinkContent {
    label: string;
    href: string;
}

export interface IconLinkContent extends LinkContent {
    icon: PixelIconName;
    /** Readable form of the link, e.g. the e-mail address. */
    display: string;
}

export interface FactContent {
    label: string;
    value: string;
}

export interface SkillContent {
    name: string;
    icon: PixelIconName;
}

export interface ProjectContent {
    title: string;
    description: string;
    tags: string[];
    icon: PixelIconName;
    links: LinkContent[];
}

/** Shared by every screen: the label on its keypad key and the heading on the LCD. */
export interface ScreenContent {
    /** At most 6 letters, so it fits on a key on small phones. */
    keyLabel: string;
    heading: string;
}

export interface HomeScreenContent extends ScreenContent {
    /** The name in big letters, one entry per line. Lines too long for the screen are drawn smaller. */
    nameLines: string[];
    role: string;
    facts: FactContent[];
    prompt: string;
}

export interface AboutScreenContent extends ScreenContent {
    paragraphs: string[];
}

export interface SkillsScreenContent extends ScreenContent {
    intro: string;
    items: SkillContent[];
}

export interface ProjectsScreenContent extends ScreenContent {
    intro: string;
    items: ProjectContent[];
}

export interface ContactScreenContent extends ScreenContent {
    intro: string;
    links: IconLinkContent[];
}

export interface SiteContent {
    meta: {
        title: string;
    };
    device: {
        /** Printed on the top of the device. It is also the page's main heading. */
        owner: string;
        model: string;
        screenLabel: string;
        keypadLabel: string;
        previousScreenLabel: string;
        nextScreenLabel: string;
        scrollUpLabel: string;
        scrollDownLabel: string;
        /** Printed under the keypad for people with a keyboard. */
        keyboardHint: string;
        /** Read out by screen readers when the screen changes, followed by the screen heading. */
        screenChangedLabel: string;
    };
    screens: {
        home: HomeScreenContent;
        about: AboutScreenContent;
        skills: SkillsScreenContent;
        projects: ProjectsScreenContent;
        contact: ContactScreenContent;
    };
    footer: {
        note: string;
    };
    /** Words that drift on the grey page around the device. */
    driftWords: string[];
}
