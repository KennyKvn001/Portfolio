import {useEffect} from 'react';
import {content} from '@app/content';
import {HomeView} from '@app/views/home/HomeView';

function App() {
    useEffect(() => {
        document.title = content.meta.title;
    }, []);

    return <HomeView/>;
}

export default App;
