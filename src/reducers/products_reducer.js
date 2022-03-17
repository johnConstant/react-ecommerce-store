import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
} from '../actions';

const products_reducer = (state, action) => {
    if (action.type === SIDEBAR_OPEN) {
        console.log('opened');

        return { ...state, isSidebarOpen: true };
    }
    if (action.type === SIDEBAR_CLOSE) {
        console.log('closed');
        return { ...state, isSidebarOpen: false };
    }
    if (action.type === GET_PRODUCTS_BEGIN) {
        console.log('loading');
        return { ...state, products_loading: true };
    }
    if (action.type === GET_PRODUCTS_SUCCESS) {
        console.log('Got em');
        const featured = action.payload.filter(
            (product) => product.featured === true
        );
        return {
            ...state,
            products: action.payload,
            featured_products: featured,
            products_loading: false,
        };
    }
    if (action.type === GET_PRODUCTS_ERROR) {
        return { ...state, products_loading: false, products_error: true };
    }
    if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
        console.log('loading');
        return {
            ...state,
            single_product_loading: true,
            single_product_error: false,
        };
    }
    if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
        console.log('Got it');
        return {
            ...state,
            product: action.payload,
            single_product_loading: false,
        };
    }
    if (action.type === GET_SINGLE_PRODUCT_ERROR) {
        return {
            ...state,
            single_product_loading: false,
            single_product_error: true,
        };
    }
    return state;
    throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
