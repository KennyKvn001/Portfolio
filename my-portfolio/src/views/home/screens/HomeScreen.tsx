import {bricksToGrid} from '@app/common/pixel/pixelBricks';
import type {HomeScreenContent} from '@app/common/types/content';
import {FitPixelText} from '@app/components/FitPixelText';
import {PixelGraphic} from '@app/components/PixelGraphic';
import {PixelParagraph} from '@app/components/PixelParagraph';
import {PixelText} from '@app/components/PixelText';

/* A half-finished brick-game stack, drawn at the bottom of the home screen. */
const BRICK_STACK = bricksToGrid([
    '..........#.',
    '#........###',
    '##..#.....##',
    '###.###.####',
    '#####.######',
]);

interface HomeScreenProps {
    content: HomeScreenContent;
}

export function HomeScreen(props: Readonly<HomeScreenProps>) {
    const {content} = props;
    return (
        <div className="lcd-screen home-screen">
            <h2 className="sr-only">{content.heading}</h2>
            <p className="home-screen__name">
                <FitPixelText lines={content.nameLines}/>
            </p>
            <PixelParagraph text={content.role} className="lcd-inverted"/>
            <dl className="home-screen__facts">
                {content.facts.map((fact) => (
                    <div key={fact.label} className="home-screen__fact">
                        <dt><PixelText text={fact.label}/></dt>
                        <dd><PixelParagraph text={fact.value}/></dd>
                    </div>
                ))}
            </dl>
            <PixelParagraph text={content.prompt} className="home-screen__prompt"/>
            <PixelGraphic grid={BRICK_STACK} className="home-screen__bricks"/>
        </div>
    );
}
