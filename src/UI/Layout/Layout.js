import React from 'react';
import NavBar from "../../components/Navigation/NavBar/NavBar";
import SearchSerials from "../../containers/SearchSerials/SearchSerials";
import './Layout.css';

const Layout = props => {

    return (
        <>
            <NavBar/>
            <SearchSerials/>
            <div className='content'>{props.children}</div>
        </>
    );
};

export default Layout;