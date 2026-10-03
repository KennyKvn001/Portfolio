import {useMemo} from 'react';
import {textToGrid} from '@app/common/pixel/pixelFont';
import {PixelGraphic} from '@app/components/PixelGraphic';

interface PixelTextProps {
    text: string;
    /** 2 draws every letter dot as 2×2 pixels. */
    size?: number;
    className?: string;
}

/**
 * One line of text in the pixel font. The real text stays in the DOM for screen readers; the drawing is
 * hidden from them.
 */
export function PixelText(props: Readonly<PixelTextProps>) {
    const {text, size, className} = props;
    const grid = useMemo(() => textToGrid(text), [text]);

    return (
        <span className={className ? `pixel-text ${className}` : 'pixel-text'}>
            <span className="sr-only">{text}</span>
            <PixelGraphic grid={grid} size={size}/>
        </span>
    );
}
