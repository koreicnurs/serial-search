import React from 'react';
import NavItems from "../NavItems/NavItems";
import './Toolbar.css';

const Toolbar = () => {
    return (
        <header className='Toolbar'>
            <div className='Logo'>Page Logo</div>
            <nav>
                <NavItems/>
            </nav>
        </header>
    );
};

export default Toolbar;