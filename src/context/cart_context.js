import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
    CLEAR_CART,
    COUNT_CART_TOTALS,
} from '../actions';

const initialState = {
    cart: [],
    total_items: 0,
    total_amount: 0,
    shipping_fee: 1000,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, colour, amount, product) => {
        dispatch({
            type: ADD_TO_CART,
            payload: { id, colour, amount, product },
        });
        console.log('added');
    };

    return (
        <CartContext.Provider value={{ ...state, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
// make sure use
export const useCartContext = () => {
    return useContext(CartContext);
};
