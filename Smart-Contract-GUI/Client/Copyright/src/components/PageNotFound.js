import React from 'react';
import 'antd/dist/antd.css';
import styles from './PageNotFound.module.css';


function PageNotFound(props) {

    return (
        <>
            <h1 className={styles.header} >
                Page Not Found <strong>404</strong>
            </h1>
        </>

    )
}

export default PageNotFound
