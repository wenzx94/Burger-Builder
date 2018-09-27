import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// }

class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        totalItems: 0,
        purchasing: false,
        loading: false,
        error: false
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const newCount = oldCount + 1;
    //     const updateIngredients = {...this.state.ingredients};
    //     updateIngredients[type] = newCount;

    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + INGREDIENT_PRICES[type];

    //     const oldTotalItems = this.state.totalItems;
    //     const newTotalItems = oldTotalItems + 1;

    //     this.setState ({
    //         ingredients: updateIngredients,
    //         totalPrice: newPrice,
    //         totalItems: newTotalItems
    //     });
    // };

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount === 0) return;
    //     const newCount = oldCount - 1;
    //     const updateIngredients = {...this.state.ingredients};
    //     updateIngredients[type] = newCount;

    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - INGREDIENT_PRICES[type];

    //     const oldTotalItems = this.state.totalItems;
    //     const newTotalItems = oldTotalItems - 1;

    //     this.setState ({
    //         ingredients: updateIngredients,
    //         totalPrice: newPrice,
    //         totalItems: newTotalItems
    //     });
    // };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: '/checkout',
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
            ...this.props.ings
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let burger = this.state.error? <p>Ingredients can't be loaded.</p> : <Spinner />;
        let orderSummary = null;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                    addIngredient={this.props.onIngredientAdded}
                    removeIngredient={this.props.onIngredientRemoved}
                    disabledButtons={disableInfo}
                    price={this.props.price}
                    purchasable={this.props.count === 0}
                    order={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = (
                <OrderSummary ingredients={this.props.ings}
                                      continueOrder={this.purchaseContinueHandler}
                                      cancelOrder={this.purchaseCancelHandler}
                                      price={this.props.price}/>
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        count: state.totalItems,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));