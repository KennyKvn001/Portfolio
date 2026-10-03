import type {SkillsScreenContent} from '@app/common/types/content';
import {PixelIcon} from '@app/components/PixelIcon';
import {PixelParagraph} from '@app/components/PixelParagraph';
import {LcdHeading} from '@app/views/home/screens/components/LcdHeading';

interface SkillsScreenProps {
    content: SkillsScreenContent;
}

export function SkillsScreen(props: Readonly<SkillsScreenProps>) {
    const {content} = props;
    return (
        <div className="lcd-screen">
            <LcdHeading text={content.heading}/>
            <PixelParagraph text={content.intro}/>
            <ul className="lcd-list">
                {content.items.map((skill) => (
                    <li key={skill.name} className="lcd-list__item">
                        <span className="lcd-list__icon">
                            <PixelIcon name={skill.icon}/>
                        </span>
                        <PixelParagraph text={skill.name}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}
