import {FitPixelText} from '@app/components/FitPixelText';

interface LcdHeadingProps {
    text: string;
}

/** Screen heading: letters drawn with 2×2 pixels per dot when they fit. */
export function LcdHeading(props: Readonly<LcdHeadingProps>) {
    return (
        <h2 className="lcd-heading">
            <FitPixelText lines={[props.text]}/>
        </h2>
    );
}
