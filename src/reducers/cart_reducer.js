import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
    if (action.type === ADD_TO_CART) {
        const { id, amount, colour, product } = action.payload;
        // Check if item is already in the cart
        const tempItem = state.cart.find((item) => item.id === id + colour);
        if (tempItem) {
            const tempCart = state.cart.map((cartItem) => {
                // If the item is already in the cart
                if (cartItem.id === id + colour) {
                    // Increase the amount
                    let newAmount = cartItem.amount + amount;
                    // check if current amount is greater than what is in stock
                    if (newAmount > cartItem.max) {
                        // if greater than amount in stock set to amount in stock
                        newAmount = cartItem.max;
                    }
                    return { ...cartItem, amount: newAmount };
                } else {
                    return cartItem;
                }
            });
            console.log(tempCart);
        } else {
            // if the item is not already in the cart, add an item with the following properties
            const newItem = {
                id: id + colour,
                name: product.name,
                colour,
                amount,
                image: product.images[0].url,
                price: product.price,
                max: product.stock,
            };
            return { ...state, cart: [...state.cart, newItem] };
        }

        return { ...state };
    }

    throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
