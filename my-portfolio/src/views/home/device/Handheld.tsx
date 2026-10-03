import {useCallback, useRef} from 'react';
import {LINE_HEIGHT} from '@app/common/pixel/pixelSize';
import {PixelParagraph} from '@app/components/PixelParagraph';
import {content} from '@app/content';
import {Keypad} from '@app/views/home/device/Keypad';
import {LcdScreen} from '@app/views/home/device/LcdScreen';
import {useScreenNavigation} from '@app/views/home/device/useScreenNavigation';
import {AboutScreen} from '@app/views/home/screens/AboutScreen';
import {ContactScreen} from '@app/views/home/screens/ContactScreen';
import {HomeScreen} from '@app/views/home/screens/HomeScreen';
import {ProjectsScreen} from '@app/views/home/screens/ProjectsScreen';
import {SkillsScreen} from '@app/views/home/screens/SkillsScreen';
import {SCREEN_KEYS, ScreenId} from '@app/views/home/types/screenId';
import './Handheld.scss';
import '@app/views/home/screens/screens.scss';

function renderScreen(screen: ScreenId) {
    const {screens} = content;
    switch (screen) {
        case ScreenId.ABOUT:
            return <AboutScreen content={screens.about}/>;
        case ScreenId.SKILLS:
            return <SkillsScreen content={screens.skills}/>;
        case ScreenId.PROJECTS:
            return <ProjectsScreen content={screens.projects}/>;
        case ScreenId.CONTACT:
            return <ContactScreen content={screens.contact}/>;
        case ScreenId.HOME:
            return <HomeScreen content={screens.home}/>;
    }
}

/** The whole site as one black and grey-green handheld: brick-game LCD and a phone keypad. */
export function Handheld() {
    const {device, screens} = content;
    const {screen, showScreen, showAdjacentScreen} = useScreenNavigation();
    const scrollRef = useRef<HTMLDivElement>(null);
    const heading = screens[screen].heading;

    const handleScroll = useCallback((lines: number) => {
        scrollRef.current?.scrollBy({top: lines * LINE_HEIGHT, behavior: 'instant'});
    }, []);

    return (
        <div className="handheld">
            <header className="handheld__top">
                <h1 className="handheld__owner">
                    <PixelParagraph text={device.owner}/>
                </h1>
                <PixelParagraph text={device.model} className="handheld__model"/>
            </header>
            <div className="handheld__body">
                <div className="handheld__bezel">
                    <LcdScreen screenKey={screen} title={`${SCREEN_KEYS[screen]} ${heading}`}
                               label={device.screenLabel} scrollRef={scrollRef}>
                        {renderScreen(screen)}
                    </LcdScreen>
                </div>
                <Keypad screen={screen} onShowScreen={showScreen} onStepScreen={showAdjacentScreen}
                        onScroll={handleScroll}/>
            </div>
            <p className="sr-only" aria-live="polite">{`${device.screenChangedLabel} ${heading}`}</p>
        </div>
    );
}
