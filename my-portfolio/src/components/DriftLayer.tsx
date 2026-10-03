import {useMemo} from 'react';
import {textToGrid} from '@app/common/pixel/pixelFont';
import {getIconGrid, type PixelIconName} from '@app/common/pixel/pixelIcons';
import type {PixelGrid} from '@app/common/pixel/pixelGrid';
import {PixelGraphic} from '@app/components/PixelGraphic';
import './DriftLayer.scss';

/** Matches the number of slots positioned in DriftLayer.scss. */
const MAX_ITEMS = 16;
const DRIFT_ICONS: readonly PixelIconName[] = [
    'heart',
    'cursor',
    'star',
    'floppy',
    'smiley',
    'terminal',
    'lightning',
    'folder',
    'sparkle',
    'globe',
];

interface DriftItem {
    key: string;
    isWord: boolean;
    grid: PixelGrid;
}

/** Alternates icons and words: two icons, then a word, until the slots are full. */
function buildDriftItems(words: readonly string[]): DriftItem[] {
    const items: DriftItem[] = [];
    let iconIndex = 0;
    let wordIndex = 0;
    while (items.length < MAX_ITEMS) {
        const isWordTurn = items.length % 3 === 2 && words.length > 0;
        if (isWordTurn) {
            const word = words[wordIndex % words.length];
            items.push({key: `word-${items.length}`, isWord: true, grid: textToGrid(word)});
            wordIndex++;
        } else {
            const icon = DRIFT_ICONS[iconIndex % DRIFT_ICONS.length];
            items.push({key: `icon-${items.length}`, isWord: false, grid: getIconGrid(icon)});
            iconIndex++;
        }
    }
    return items;
}

interface DriftLayerProps {
    words: readonly string[];
}

/** Black pixel icons and words drifting step by step behind the page content. Purely decorative. */
export function DriftLayer(props: Readonly<DriftLayerProps>) {
    const items = useMemo(() => buildDriftItems(props.words), [props.words]);
    return (
        <div className="drift-layer" aria-hidden="true">
            {items.map((item) => (
                <div key={item.key} className={`drift-layer__item${item.isWord ? ' drift-layer__item--word' : ''}`}>
                    <PixelGraphic grid={item.grid}/>
                </div>
            ))}
        </div>
    );
}
