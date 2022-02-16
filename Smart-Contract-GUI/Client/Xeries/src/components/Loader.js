import React from 'react';
import 'antd/dist/antd.css';
import { Spin } from 'antd';


function Loader(props) {
    return (
        <Spin
            style={{ marginTop: "30vh" }}
            size="large"
            tip="Loading..."
        />
    )
}

export default Loader
