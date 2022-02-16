import React from 'react'
import NavBar from '../components/NavBar'


const WithNavBar = (Comp) => (props) => {
    return (
        <>
            <NavBar history={props.history} />
            <Comp {...props} />
        </>
    )
}


export default WithNavBar