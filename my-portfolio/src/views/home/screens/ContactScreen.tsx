import type {ContactScreenContent} from '@app/common/types/content';
import {PixelIcon} from '@app/components/PixelIcon';
import {PixelParagraph} from '@app/components/PixelParagraph';
import {LcdHeading} from '@app/views/home/screens/components/LcdHeading';
import {LcdLink} from '@app/views/home/screens/components/LcdLink';

interface ContactScreenProps {
    content: ContactScreenContent;
}

export function ContactScreen(props: Readonly<ContactScreenProps>) {
    const {content} = props;
    return (
        <div className="lcd-screen">
            <LcdHeading text={content.heading}/>
            <PixelParagraph text={content.intro}/>
            <ul className="lcd-list">
                {content.links.map((link) => (
                    <li key={link.label} className="lcd-list__item">
                        <span className="lcd-list__icon">
                            <PixelIcon name={link.icon}/>
                        </span>
                        <div className="lcd-contact">
                            <LcdLink label={link.label} href={link.href}/>
                            <PixelParagraph text={link.display}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
