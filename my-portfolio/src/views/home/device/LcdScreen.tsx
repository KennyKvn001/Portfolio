import {useEffect, useRef, useState, type ReactNode, type Ref, type RefObject} from 'react';
import {createEmptyGrid, type PixelGrid} from '@app/common/pixel/pixelGrid';
import {PixelGraphic} from '@app/components/PixelGraphic';
import {PixelIcon} from '@app/components/PixelIcon';
import {PixelText} from '@app/components/PixelText';
import {LINE_HEIGHT, PIXEL_SIZE} from '@app/common/pixel/pixelSize';
import './LcdScreen.scss';

const SCROLLBAR_COLUMNS = 2;
/** Wheel distance that counts as one notch, so trackpads do not scroll a line per tiny event. */
const WHEEL_NOTCH = 40;

interface LcdScreenProps {
    /** Changes whenever another screen is shown; the content then starts at the top again. */
    screenKey: string;
    title: string;
    label: string;
    scrollRef: RefObject<HTMLDivElement | null>;
    children: ReactNode;
}

interface ScrollState {
    trackRows: number;
    thumbStart: number;
    thumbRows: number;
}

const EMPTY_SCROLL: ScrollState = {trackRows: 0, thumbStart: 0, thumbRows: 0};

function readScrollState(element: HTMLElement): ScrollState {
    const trackRows = Math.floor(element.clientHeight / PIXEL_SIZE);
    if (element.scrollHeight <= element.clientHeight) {
        return {trackRows, thumbStart: 0, thumbRows: 0};
    }
    const visibleShare = element.clientHeight / element.scrollHeight;
    const thumbRows = Math.max(4, Math.round(trackRows * visibleShare));
    const scrolledShare = element.scrollTop / (element.scrollHeight - element.clientHeight);
    return {trackRows, thumbRows, thumbStart: Math.round((trackRows - thumbRows) * scrolledShare)};
}

/** Pixel scrollbar: a dotted track with a solid thumb. Hidden when nothing scrolls. */
function buildScrollbarGrid(state: ScrollState): PixelGrid {
    const cells = createEmptyGrid(SCROLLBAR_COLUMNS, state.trackRows);
    for (let row = 0; row < state.trackRows; row++) {
        const isThumb = row >= state.thumbStart && row < state.thumbStart + state.thumbRows;
        cells[row].fill(isThumb || row % 2 === 0);
    }
    return {columns: SCROLLBAR_COLUMNS, rows: state.trackRows, cells};
}

/** Moves the content one whole text line per wheel notch, so it scrolls in steps, not smoothly. */
function useSteppedWheel(scrollRef: RefObject<HTMLDivElement | null>) {
    useEffect(() => {
        const element = scrollRef.current;
        if (!element) {
            return;
        }
        let pendingDelta = 0;
        const handleWheel = (event: WheelEvent) => {
            const direction = Math.sign(event.deltaY);
            const isAtTop = element.scrollTop <= 0;
            const isAtBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
            if (direction === 0 || (direction < 0 && isAtTop) || (direction > 0 && isAtBottom)) {
                return;
            }
            event.preventDefault();
            pendingDelta += event.deltaY;
            const lines = Math.trunc(pendingDelta / WHEEL_NOTCH);
            if (lines !== 0) {
                pendingDelta -= lines * WHEEL_NOTCH;
                element.scrollTop += lines * LINE_HEIGHT;
            }
        };
        element.addEventListener('wheel', handleWheel, {passive: false});
        return () => element.removeEventListener('wheel', handleWheel);
    }, [scrollRef]);
}

export function LcdScreen(props: Readonly<LcdScreenProps>) {
    const {screenKey, title, label, scrollRef, children} = props;
    const [scrollState, setScrollState] = useState<ScrollState>(EMPTY_SCROLL);
    const contentRef = useRef<HTMLDivElement>(null);
    useSteppedWheel(scrollRef);

    useEffect(() => {
        const element = scrollRef.current;
        const contentElement = contentRef.current;
        if (!element || !contentElement) {
            return;
        }
        element.scrollTop = 0;
        const update = () => setScrollState(readScrollState(element));
        // Touch scrolling can stop between pixels; snap back to the grid so text stays on whole pixels.
        const snapToPixels = () => {
            const snapped = Math.round(element.scrollTop / PIXEL_SIZE) * PIXEL_SIZE;
            if (snapped !== element.scrollTop) {
                element.scrollTop = snapped;
            }
        };
        element.addEventListener('scrollend', snapToPixels);
        const resizeObserver = new ResizeObserver(update);
        resizeObserver.observe(element);
        resizeObserver.observe(contentElement);
        element.addEventListener('scroll', update);
        return () => {
            resizeObserver.disconnect();
            element.removeEventListener('scroll', update);
            element.removeEventListener('scrollend', snapToPixels);
        };
    }, [scrollRef, screenKey]);

    return (
        <section className="lcd" aria-label={label}>
            <div className="lcd__status">
                <PixelIcon name="signal"/>
                <PixelText text={title} className="lcd__title"/>
                <PixelIcon name="battery"/>
            </div>
            <div className="lcd__body">
                <div ref={scrollRef as Ref<HTMLDivElement>} className="lcd__scroll" tabIndex={0} aria-label={title}>
                    <div ref={contentRef} className="lcd__content">{children}</div>
                </div>
                {scrollState.thumbRows > 0 && (
                    <PixelGraphic grid={buildScrollbarGrid(scrollState)} className="lcd__scrollbar"/>
                )}
            </div>
        </section>
    );
}
