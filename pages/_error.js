import styles from '@/styles/Home.module.css';
import { useEffect } from 'react';
function Error({ statusCode }) {
    useEffect(() => {
        location.href = '/';
    }, []);
    return <></>;
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
