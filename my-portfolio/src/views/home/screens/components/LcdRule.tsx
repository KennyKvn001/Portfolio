import {useId} from 'react';
import {PIXEL_SIZE} from '@app/common/pixel/pixelSize';

const DOT = PIXEL_SIZE;
const PERIOD = PIXEL_SIZE * 2;

/** A dotted line: one lit pixel, one unlit, repeated. */
export function LcdRule() {
    const patternId = useId();
    return (
        <svg className="lcd-rule" width="100%" height={PIXEL_SIZE} shapeRendering="crispEdges" aria-hidden="true"
             focusable="false">
            <defs>
                <pattern id={patternId} width={PERIOD} height={PIXEL_SIZE} patternUnits="userSpaceOnUse">
                    <rect width={DOT} height={DOT} fill="currentColor"/>
                </pattern>
            </defs>
            <rect width="100%" height={PIXEL_SIZE} fill={`url(#${patternId})`}/>
        </svg>
    );
}
