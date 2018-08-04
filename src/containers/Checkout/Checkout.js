import React,  { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    };
    componentWillMount() {
        //this.setState({ingredients: ingredients});
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for ( let param of query.entries() ) {
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState( { ingredients: ingredients, totalPrice: price } );
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    };
    continueCheckoutHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
        //this.setState({loading: true});
    //     const order = {
    //         ingredients: this.state.ingredients,
    //         //price: this.state.totalPrice,
    //         customer: {
    //             name: "Jason",
    //             address: {
    //                 street: "Teststreet 1",
    //                 zipcode: "12345",
    //                 country: "US",
    //             },
    //             email: "test@test.com"
    //         },
    //         deliveryMethod: "fastest"
    //     }
    //     axios.post('/orders.json', order)
    //         .then(response => {
    //             this.setState({loading: false, purchasing: false});
    //         })
    //         .catch(error => {
    //             this.setState({loading: false, purchasing: false});
    //         });
     };

    render() {
        return(
            <div>
                <CheckoutSummary 
                    cancel={this.cancelCheckoutHandler}
                    continue={this.continueCheckoutHandler}
                    ingredients={this.state.ingredients} />
                <Route path={'/checkout/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} 
                                                     price={this.state.totalPrice} 
                                                     {...props} />)} />
            </div>
        );
    }
}

export default Checkout;