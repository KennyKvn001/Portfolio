import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '@app/styles/main.scss';
import App from '@app/App';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Missing #root element in index.html');
}

createRoot(rootElement).render(
    <StrictMode>
        <App/>
    </StrictMode>,
);
