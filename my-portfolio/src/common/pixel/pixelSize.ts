/*
 * The one pixel of the whole site. The page is a dot-matrix screen: a fixed grid of PIXEL_SIZE cells, each
 * either lit (some colour) or empty. Shapes are drawn as solid blocks of whole cells; one mask over the page
 * (see `.dot-matrix` in src/styles/_base.scss) turns every cell into an equal square with a gap around it.
 * Keep in sync with $pixel in src/styles/_tokens.scss.
 */
export const PIXEL_SIZE = 4;

/** One text line: 7 pixels of letter plus 2 pixels of line gap. Scrolling moves by whole lines. */
export const LINE_HEIGHT = PIXEL_SIZE * 9;
