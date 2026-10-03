import {PIXEL_SIZE} from '@app/common/pixel/pixelSize';

/** A 2D bitmap: `cells[row][column]` is true when that pixel is on. */
export interface PixelGrid {
    readonly columns: number;
    readonly rows: number;
    readonly cells: readonly (readonly boolean[])[];
}

const ON_CHARACTER = '#';

export const EMPTY_GRID: PixelGrid = {columns: 0, rows: 0, cells: []};

/** Parses a sprite drawn as strings, where `#` is an on pixel and anything else is off. */
export function parseSprite(rows: readonly string[]): PixelGrid {
    const columns = Math.max(0, ...rows.map((row) => row.length));
    const cells = rows.map((row) => Array.from({length: columns}, (_, column) => row[column] === ON_CHARACTER));
    return {columns, rows: rows.length, cells};
}

export function createEmptyGrid(columns: number, rows: number): boolean[][] {
    return Array.from({length: rows}, () => new Array<boolean>(columns).fill(false));
}

/** Copies the on pixels of `source` into `target` at the given offset. */
export function stamp(target: boolean[][], source: PixelGrid, left: number, top: number): void {
    for (let row = 0; row < source.rows; row++) {
        for (let column = 0; column < source.columns; column++) {
            if (source.cells[row][column]) {
                target[top + row][left + column] = true;
            }
        }
    }
}

/** Places grids side by side with `spacing` empty columns between them, vertically centred. */
export function joinHorizontally(parts: readonly PixelGrid[], spacing: number): PixelGrid {
    const visibleParts = parts.filter((part) => part.columns > 0);
    if (visibleParts.length === 0) {
        return EMPTY_GRID;
    }
    const rows = Math.max(...visibleParts.map((part) => part.rows));
    const columns = visibleParts.reduce((sum, part) => sum + part.columns, 0) + spacing * (visibleParts.length - 1);
    const cells = createEmptyGrid(columns, rows);
    let left = 0;
    for (const part of visibleParts) {
        stamp(cells, part, left, Math.floor((rows - part.rows) / 2));
        left += part.columns + spacing;
    }
    return {columns, rows, cells};
}

/**
 * Builds one SVG path that fills a whole grid cell per on pixel. The page's dot-matrix mask makes the gaps,
 * so every pixel ends up the same size. With `size` 2, every grid cell becomes 2×2 pixels: text gets bigger
 * while each pixel stays the same.
 */
export function gridToSvgPath(grid: PixelGrid, size: number): string {
    const square = PIXEL_SIZE;
    const commands: string[] = [];
    for (let row = 0; row < grid.rows; row++) {
        for (let column = 0; column < grid.columns; column++) {
            if (!grid.cells[row][column]) {
                continue;
            }
            for (let blockRow = 0; blockRow < size; blockRow++) {
                for (let blockColumn = 0; blockColumn < size; blockColumn++) {
                    const x = (column * size + blockColumn) * PIXEL_SIZE;
                    const y = (row * size + blockRow) * PIXEL_SIZE;
                    commands.push(`M${x} ${y}h${square}v${square}h-${square}z`);
                }
            }
        }
    }
    return commands.join('');
}
