import '@/styles/globals.css';
import Top from '@/src/component/Top';
import Bottom from '@/src/component/Bottom';

export default function App({ Component, pageProps }) {
    return (
        <div>
            <Top />
            <Component {...pageProps} />
            <Bottom />
        </div>
    );
}
