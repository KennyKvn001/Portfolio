import {useMemo} from 'react';
import {gridToSvgPath, type PixelGrid} from '@app/common/pixel/pixelGrid';
import {PIXEL_SIZE} from '@app/common/pixel/pixelSize';

interface PixelGraphicProps {
    grid: PixelGrid;
    /** 1 = one pixel per grid cell, 2 = 2×2 pixels per cell. Pixels themselves never change size. */
    size?: number;
    /** Accessible description. Without it the graphic is hidden from assistive technology. */
    label?: string;
    className?: string;
}

/** Draws a grid in `currentColor` on the global pixel grid. Its size is always a whole number of pixels. */
export function PixelGraphic(props: Readonly<PixelGraphicProps>) {
    const {grid, size = 1, label, className} = props;
    const path = useMemo(() => gridToSvgPath(grid, size), [grid, size]);
    const width = grid.columns * size * PIXEL_SIZE;
    const height = grid.rows * size * PIXEL_SIZE;
    const accessibility = label ? {role: 'img', 'aria-label': label} : {'aria-hidden': true};

    return (
        <svg
            className={className ? `pixel-graphic ${className}` : 'pixel-graphic'}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            shapeRendering="crispEdges"
            focusable="false"
            {...accessibility}
        >
            <path d={path} fill="currentColor"/>
        </svg>
    );
}
