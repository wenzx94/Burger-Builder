import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        totalItems: 0,
        purchasing: false,
        loading: false,
        error: false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = newCount;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];

        const oldTotalItems = this.state.totalItems;
        const newTotalItems = oldTotalItems + 1;

        this.setState ({
            ingredients: updateIngredients,
            totalPrice: newPrice,
            totalItems: newTotalItems
        });
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) return;
        const newCount = oldCount - 1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = newCount;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICES[type];

        const oldTotalItems = this.state.totalItems;
        const newTotalItems = oldTotalItems - 1;

        this.setState ({
            ingredients: updateIngredients,
            totalPrice: newPrice,
            totalItems: newTotalItems
        });
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    continueToCheckout = () => {
        this.props.history.push({...this.state.ingredients});
    }

    componentDidMount() {
        axios.get('/Ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let burger = this.state.error? <p>Ingredients can't be loaded.</p> : <Spinner />;
        let orderSummary = null;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabledButtons={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.totalItems === 0}
                    order={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = (
                <OrderSummary ingredients={this.state.ingredients}
                                      continueOrder={this.purchaseContinueHandler}
                                      cancelOrder={this.purchaseCancelHandler}
                                      price={this.state.totalPrice}/>
            );
        }
        if (this.state.loading) {
            orderSummary = (<Spinner />);
        }
        return(
            <Aux>
                {burger}
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);