import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
//import Aux from '../../hoc/Aux/Aux';
import classes from './Burger.css';

const Burger = (props) => {

    let contents = Object.keys(props.ingredients)
        .map(igkey => {
            return [...Array(props.ingredients[igkey])].map((_, i) => {
                return <BurgerIngredient keys={igkey + i} type={igkey}/>
            });
        });
    const flattenContents = contents.reduce((arr1, arr2) => {return arr1.concat(arr2)});
    if(flattenContents.length === 0) contents = (<p>Please start adding ingredients!</p>);
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {contents}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
    
};

export default Burger;