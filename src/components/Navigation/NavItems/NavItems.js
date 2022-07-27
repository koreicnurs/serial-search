import React from 'react';
import {NavLink} from "react-router-dom";
import './NavItems.css';

const NavItems = () => {
    return (
        <ul className='Nav-Items'>
           <li className='Nav-Item'>
               <NavLink to='/' exact>Main</NavLink>
           </li>
        </ul>
    );
};

export default NavItems;