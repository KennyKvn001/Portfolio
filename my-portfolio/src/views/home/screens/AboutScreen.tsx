import type {AboutScreenContent} from '@app/common/types/content';
import {PixelParagraph} from '@app/components/PixelParagraph';
import {LcdHeading} from '@app/views/home/screens/components/LcdHeading';

interface AboutScreenProps {
    content: AboutScreenContent;
}

export function AboutScreen(props: Readonly<AboutScreenProps>) {
    const {content} = props;
    return (
        <div className="lcd-screen">
            <LcdHeading text={content.heading}/>
            {content.paragraphs.map((paragraph) => (
                <PixelParagraph key={paragraph} text={paragraph}/>
            ))}
        </div>
    );
}
