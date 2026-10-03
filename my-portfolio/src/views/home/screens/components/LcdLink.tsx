import {PixelText} from '@app/components/PixelText';

interface LcdLinkProps {
    label: string;
    href: string;
}

/** A link on the LCD: `>` marker, inverted while hovered or focused. */
export function LcdLink(props: Readonly<LcdLinkProps>) {
    return (
        <a className="lcd-link" href={props.href}>
            <PixelText text={`> ${props.label}`}/>
        </a>
    );
}
