import {createEmptyGrid, parseSprite, stamp, type PixelGrid} from '@app/common/pixel/pixelGrid';

/* One block of a brick game: a frame with a filled centre. */
const BRICK = parseSprite(['#####', '#...#', '#.#.#', '#...#', '#####']);
const BRICK_PITCH = BRICK.columns + 1;

/** Turns a map of bricks (`#` = brick) into pixels, so brick-game stacks can be drawn like any sprite. */
export function bricksToGrid(rows: readonly string[]): PixelGrid {
    const brickColumns = Math.max(0, ...rows.map((row) => row.length));
    const columns = brickColumns * BRICK_PITCH;
    const cells = createEmptyGrid(columns, rows.length * BRICK_PITCH);
    rows.forEach((row, rowIndex) => {
        Array.from(row).forEach((character, columnIndex) => {
            if (character === '#') {
                stamp(cells, BRICK, columnIndex * BRICK_PITCH, rowIndex * BRICK_PITCH);
            }
        });
    });
    return {columns, rows: rows.length * BRICK_PITCH, cells};
}
