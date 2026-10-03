import {DriftLayer} from '@app/components/DriftLayer';
import {PixelParagraph} from '@app/components/PixelParagraph';
import {content} from '@app/content';
import {Handheld} from '@app/views/home/device/Handheld';
import './HomeView.scss';

export function HomeView() {
    const footerText = `© ${new Date().getFullYear()} ${content.device.owner}. ${content.footer.note}`;
    return (
        <div className="dot-matrix">
            <DriftLayer words={content.driftWords}/>
            <main className="home">
                <Handheld/>
            </main>
            <footer className="home-footer">
                <PixelParagraph text={footerText} className="home-footer__text"/>
            </footer>
        </div>
    );
}
