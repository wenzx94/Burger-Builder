import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/burger-builder" 
                        clicked={props.checkout}>
            Burger Builder</NavigationItem>
        <NavigationItem clicked={props.buildBurger}
                        link="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;