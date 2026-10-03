import {getIconGrid, type PixelIconName} from '@app/common/pixel/pixelIcons';
import {PixelGraphic} from '@app/components/PixelGraphic';

interface PixelIconProps {
    name: PixelIconName;
    /** Alt text. Leave empty for decorative icons. */
    label?: string;
    className?: string;
}

export function PixelIcon(props: Readonly<PixelIconProps>) {
    const {name, label, className} = props;
    return (
        <PixelGraphic
            grid={getIconGrid(name)}
            label={label}
            className={className ? `pixel-icon ${className}` : 'pixel-icon'}
        />
    );
}
