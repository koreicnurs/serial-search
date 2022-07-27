import React from 'react';
import NavBar from "../../components/Navigation/NavBar/NavBar";
import SearchSerials from "../../containers/SearchSerials/SearchSerials";
import './Layout.css';

const Layout = props => {

    return (
        <div>
            <NavBar/>
            <SearchSerials/>
            <div className='content'>{props.children}</div>
        </div>
    );
};

export default Layout;