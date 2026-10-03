import type {SiteContent} from '@app/common/types/content';

/*
 * All text on the site lives here. Edit the values and save; the dev server reloads the page.
 * Anything in [square brackets] or pointing at example.com / your-username is a placeholder to replace.
 * Text is drawn in a capitals-only pixel font, so case does not matter on screen
 * (screen readers still get the text exactly as written here).
 */
export const content: SiteContent = {
    meta: {
        title: 'Kenny : Full-stack software engineer',
    },
    device: {
        owner: 'Kenny',
        model: 'Portfolio 4 in 1',
        screenLabel: 'Screen',
        keypadLabel: 'Keypad',
        previousScreenLabel: 'Previous screen',
        nextScreenLabel: 'Next screen',
        scrollUpLabel: 'Scroll up',
        scrollDownLabel: 'Scroll down',
        screenChangedLabel: 'Screen:',
        keyboardHint: 'Keys 0-4 open screens',
    },
    screens: {
        home: {
            keyLabel: 'Home',
            heading: 'Home',
            nameLines: ['Kenny'],
            role: 'Full-stack software engineer',
            facts: [
                {label: 'Base', value: 'Kigali, Rwanda'},
                {label: 'Exp', value: '3+ years'},
                {label: 'Stack', value: 'TS · React · Java · SQL'},
            ],
            prompt: 'Press 1-4 to start',
        },
        about: {
            keyLabel: 'About',
            heading: 'About',
            paragraphs: [
                "Hi, I'm Kenny, a full-stack software engineer based in Kigali, Rwanda.",
                'For more than three years I have built web applications from the database up to the interface: typed React frontends, Java services on Quarkus and PostgreSQL data models.',
                '[Placeholder: add a sentence about the kind of work or team you are looking for.]',
            ],
        },
        skills: {
            keyLabel: 'Skills',
            heading: 'Skills',
            intro: 'The stack I use every day.',
            items: [
                {name: 'TypeScript', icon: 'typescript'},
                {name: 'React', icon: 'atom'},
                {name: 'Java (Quarkus)', icon: 'coffee'},
                {name: 'PostgreSQL', icon: 'database'},
            ],
        },
        projects: {
            keyLabel: 'Work',
            heading: 'Projects',
            intro: '[Placeholder: replace these three projects with your own.]',
            items: [
                {
                    title: 'Project One',
                    description: '[Placeholder] What the project does, who it is for and what you built.',
                    tags: ['Tag', 'Tag'],
                    icon: 'folder',
                    links: [
                        {label: 'Live', href: 'https://example.com/project-one'},
                        {label: 'Code', href: 'https://github.com/your-username/project-one'},
                    ],
                },
                {
                    title: 'Project Two',
                    description: '[Placeholder] What the project does, who it is for and what you built.',
                    tags: ['Tag', 'Tag'],
                    icon: 'terminal',
                    links: [
                        {label: 'Live', href: 'https://example.com/project-two'},
                        {label: 'Code', href: 'https://github.com/your-username/project-two'},
                    ],
                },
                {
                    title: 'Project Three',
                    description: '[Placeholder] What the project does, who it is for and what you built.',
                    tags: ['Tag', 'Tag'],
                    icon: 'floppy',
                    links: [
                        {label: 'Live', href: 'https://example.com/project-three'},
                        {label: 'Code', href: 'https://github.com/your-username/project-three'},
                    ],
                },
            ],
        },
        contact: {
            keyLabel: 'Mail',
            heading: 'Contact',
            intro: 'Have a role or a project in mind? Send me a message.',
            links: [
                {label: 'Email', href: 'mailto:you@example.com', display: 'you@example.com', icon: 'mail'},
                {
                    label: 'GitHub',
                    href: 'https://github.com/your-username',
                    display: 'github.com/your-username',
                    icon: 'branch',
                },
                {
                    label: 'LinkedIn',
                    href: 'https://www.linkedin.com/in/your-username',
                    display: 'linkedin.com/in/your-username',
                    icon: 'linkedin',
                },
            ],
        },
    },
    footer: {
        note: 'Made of squares in Kigali.',
    },
    driftWords: ['Hello', 'Muraho', 'Kigali', 'Build', 'Ship it', 'Code'],
};
