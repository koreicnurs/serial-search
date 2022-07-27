import React from 'react';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import './Layout.css';

const Layout = props => {

    return (
        <div>
            <Toolbar/>
            <div className='content'>{props.children}</div>
        </div>
    );
};

export default Layout;