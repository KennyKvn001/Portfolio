import {useMemo} from 'react';
import {textToGrid} from '@app/common/pixel/pixelFont';
import {PixelGraphic} from '@app/components/PixelGraphic';
import './PixelParagraph.scss';

/** Longer words are split so a word never overflows a 360px phone screen (11 letters = 264px). */
const MAX_WORD_LENGTH = 11;

interface PixelParagraphProps {
    text: string;
    className?: string;
}

/** Words, each split into pieces of at most MAX_WORD_LENGTH letters. */
function splitIntoWords(text: string): string[][] {
    return text
        .split(/\s+/)
        .filter((word) => word.length > 0)
        .map((word) => word.match(new RegExp(`.{1,${MAX_WORD_LENGTH}}`, 'g')) ?? []);
}

/**
 * A wrapping paragraph in the pixel font: one SVG per word, so the browser wraps lines for us.
 * Screen readers get the plain text.
 */
export function PixelParagraph(props: Readonly<PixelParagraphProps>) {
    const {text, className} = props;
    const words = useMemo(() => splitIntoWords(text).map((pieces) => pieces.map((piece) => textToGrid(piece))), [text]);

    return (
        <p className={className ? `pixel-paragraph ${className}` : 'pixel-paragraph'}>
            <span className="sr-only">{text}</span>
            {words.map((pieces, wordIndex) => (
                <span key={wordIndex} className="pixel-paragraph__word">
                    {pieces.map((grid, pieceIndex) => (
                        <PixelGraphic key={pieceIndex} grid={grid}/>
                    ))}
                </span>
            ))}
        </p>
    );
}
