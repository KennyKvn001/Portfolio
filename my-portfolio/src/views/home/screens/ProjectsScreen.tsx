import type {ProjectsScreenContent} from '@app/common/types/content';
import {PixelIcon} from '@app/components/PixelIcon';
import {PixelParagraph} from '@app/components/PixelParagraph';
import {PixelText} from '@app/components/PixelText';
import {LcdHeading} from '@app/views/home/screens/components/LcdHeading';
import {LcdLink} from '@app/views/home/screens/components/LcdLink';
import {LcdRule} from '@app/views/home/screens/components/LcdRule';

interface ProjectsScreenProps {
    content: ProjectsScreenContent;
}

function formatProjectNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
}

export function ProjectsScreen(props: Readonly<ProjectsScreenProps>) {
    const {content} = props;
    return (
        <div className="lcd-screen">
            <LcdHeading text={content.heading}/>
            <PixelParagraph text={content.intro}/>
            {content.items.map((project, index) => (
                <article key={project.title} className="lcd-project">
                    <LcdRule/>
                    <h3 className="lcd-project__title">
                        <PixelParagraph text={`${formatProjectNumber(index)} ${project.title}`}
                                        className="lcd-inverted"/>
                    </h3>
                    <div className="lcd-project__summary">
                        <span className="lcd-list__icon">
                            <PixelIcon name={project.icon}/>
                        </span>
                        <PixelParagraph text={project.description}/>
                    </div>
                    <ul className="lcd-tags">
                        {project.tags.map((tag, tagIndex) => (
                            <li key={`${tag}-${tagIndex}`}>
                                <PixelText text={`[${tag}]`}/>
                            </li>
                        ))}
                    </ul>
                    <div className="lcd-links">
                        {project.links.map((link) => (
                            <LcdLink key={link.href} label={link.label} href={link.href}/>
                        ))}
                    </div>
                </article>
            ))}
        </div>
    );
}
