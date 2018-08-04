import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo.js';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggler from '../SideDrawer/SideDrawerToggler/SideDrawerToggler';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems status={props.checkingOut}
                             checkout={props.goCheckout}
                             buildBurger={props.goBuildBurger}/>
        </nav>
        <SideDrawerToggler clicked={props.openDrawer}/>
    </header>
);

export default toolbar;