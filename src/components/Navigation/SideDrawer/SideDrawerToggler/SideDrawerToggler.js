import React from 'react';
import classes from './SideDrawerToggler.css';

const sideDrawerToggler = (props) => (
    <div onClick={props.clicked} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default sideDrawerToggler;