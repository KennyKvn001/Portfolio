import {useCallback} from 'react';
import {parseSprite} from '@app/common/pixel/pixelGrid';
import type {PixelIconName} from '@app/common/pixel/pixelIcons';
import {PixelGraphic} from '@app/components/PixelGraphic';
import {PixelIcon} from '@app/components/PixelIcon';
import {PixelParagraph} from '@app/components/PixelParagraph';
import {PixelText} from '@app/components/PixelText';
import {content} from '@app/content';
import {SCREEN_KEYS, ScreenId} from '@app/views/home/types/screenId';
import './Keypad.scss';

const DIGIT_SIZE = 2;
/** Lines moved by one press of the up or down key. */
const SCROLL_LINES_PER_PRESS = 3;

/* Speaker slots, like the grille on an old handheld. */
const SPEAKER_GRILLE = parseSprite([
    '####.####.####.####',
    '...................',
    '####.####.####.####',
    '...................',
    '####.####.####.####',
]);

/** Two columns: 1 2, 3 4, then a wide 0 key. */
const NUMBER_KEYS: readonly ScreenId[] = [
    ScreenId.ABOUT,
    ScreenId.SKILLS,
    ScreenId.PROJECTS,
    ScreenId.CONTACT,
    ScreenId.HOME,
];

interface KeypadProps {
    screen: ScreenId;
    onShowScreen: (screen: ScreenId) => void;
    onStepScreen: (step: number) => void;
    onScroll: (lines: number) => void;
}

interface ArrowKeyProps {
    icon: PixelIconName;
    label: string;
    shortcut: string;
    onPress: () => void;
}

function ArrowKey(props: Readonly<ArrowKeyProps>) {
    return (
        <button type="button" className="keypad__key keypad__key--arrow" aria-label={props.label}
                aria-keyshortcuts={props.shortcut} onClick={props.onPress}>
            <PixelIcon name={props.icon}/>
        </button>
    );
}

export function Keypad(props: Readonly<KeypadProps>) {
    const {screen, onShowScreen, onStepScreen, onScroll} = props;
    const {device, screens} = content;
    const handlePrevious = useCallback(() => onStepScreen(-1), [onStepScreen]);
    const handleNext = useCallback(() => onStepScreen(1), [onStepScreen]);
    const handleScrollUp = useCallback(() => onScroll(-SCROLL_LINES_PER_PRESS), [onScroll]);
    const handleScrollDown = useCallback(() => onScroll(SCROLL_LINES_PER_PRESS), [onScroll]);

    return (
        <div className="keypad" role="group" aria-label={device.keypadLabel}>
            <div className="keypad__arrows">
                <ArrowKey icon="arrowLeft" label={device.previousScreenLabel} shortcut="ArrowLeft"
                          onPress={handlePrevious}/>
                <ArrowKey icon="arrowUp" label={device.scrollUpLabel} shortcut="ArrowUp" onPress={handleScrollUp}/>
                <ArrowKey icon="arrowDown" label={device.scrollDownLabel} shortcut="ArrowDown"
                          onPress={handleScrollDown}/>
                <ArrowKey icon="arrowRight" label={device.nextScreenLabel} shortcut="ArrowRight"
                          onPress={handleNext}/>
            </div>
            <div className="keypad__numbers">
                {NUMBER_KEYS.map((id) => (
                    <button key={id} type="button"
                            className={`keypad__key${id === ScreenId.HOME ? ' keypad__key--wide' : ''}`}
                            aria-pressed={screen === id} aria-keyshortcuts={SCREEN_KEYS[id]}
                            onClick={() => onShowScreen(id)}>
                        <PixelText text={SCREEN_KEYS[id]} size={DIGIT_SIZE}/>
                        <PixelText text={screens[id].keyLabel}/>
                    </button>
                ))}
            </div>
            <PixelParagraph text={device.keyboardHint} className="keypad__hint"/>
            <PixelGraphic grid={SPEAKER_GRILLE} className="keypad__speaker"/>
        </div>
    );
}
