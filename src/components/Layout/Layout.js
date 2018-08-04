import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    closeSideDrawer = () => {
        this.setState({
            showSideDrawer: false
        })
    }
    openSideDrawer = () => {
        this.setState({
            showSideDrawer: true
        })
    }
    toggleSideDrawer = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar openDrawer={this.openSideDrawer} 
                         checkingOut={this.state.checkout}
                />
                <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawer}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
}

export default Layout;