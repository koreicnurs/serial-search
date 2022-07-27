import React from 'react';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import './Layout.css';
import SearchSerials from "../../containers/SearchSerials/SearchSerials";

const Layout = props => {

    return (
        <div>
            <Toolbar/>
            <SearchSerials/>
            <div className='content'>{props.children}</div>
        </div>
    );
};

export default Layout;