import {useLayoutEffect, useMemo, useRef, useState} from 'react';
import {textToGrid} from '@app/common/pixel/pixelFont';
import {PIXEL_SIZE} from '@app/common/pixel/pixelSize';
import {PixelGraphic} from '@app/components/PixelGraphic';
import type {PixelGrid} from '@app/common/pixel/pixelGrid';
import './FitPixelText.scss';

/** Width of one letter including its spacing, in grid cells. */
const LETTER_COLUMNS = 6;

interface FitPixelTextProps {
    /** Each entry is drawn on its own line. */
    lines: readonly string[];
    /** Largest letter size to try; a line falls back to smaller sizes until it fits the width. */
    maxSize?: number;
    className?: string;
}

interface FittedLine {
    grid: PixelGrid;
    size: number;
}

/** Splits text into pieces of at most `maxLetters`, for lines too long even at the smallest size. */
function chunk(text: string, maxLetters: number): string[] {
    return text.match(new RegExp(`.{1,${Math.max(1, maxLetters)}}`, 'g')) ?? [];
}

function fitLine(line: string, maxSize: number, availableWidth: number): FittedLine[] {
    const grid = textToGrid(line);
    for (let size = maxSize; size >= 1; size--) {
        if (grid.columns * size * PIXEL_SIZE <= availableWidth) {
            return [{grid, size}];
        }
    }
    const maxLetters = Math.floor((availableWidth / PIXEL_SIZE + 1) / LETTER_COLUMNS);
    return chunk(line, maxLetters).map((piece) => ({grid: textToGrid(piece), size: 1}));
}

/**
 * Big pixel text that never overflows: each line uses the largest size (2×2, then 1×1 pixels per letter
 * dot) that fits the available width, and breaks into pieces if even that is too wide. Pixels keep their
 * size; only the letters grow.
 */
export function FitPixelText(props: Readonly<FitPixelTextProps>) {
    const {lines, maxSize = 2, className} = props;
    const containerRef = useRef<HTMLSpanElement>(null);
    const [availableWidth, setAvailableWidth] = useState(Number.POSITIVE_INFINITY);
    const fittedLines = useMemo(
        () => lines.flatMap((line) => fitLine(line, maxSize, availableWidth)),
        [lines, maxSize, availableWidth],
    );

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }
        const observer = new ResizeObserver(() => setAvailableWidth(container.clientWidth));
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    return (
        <span ref={containerRef} className={className ? `fit-pixel-text ${className}` : 'fit-pixel-text'}>
            <span className="sr-only">{lines.join(' ')}</span>
            {fittedLines.map((line, index) => (
                <PixelGraphic key={index} grid={line.grid} size={line.size}/>
            ))}
        </span>
    );
}
