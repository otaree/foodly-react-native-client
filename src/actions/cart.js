import Api from '../config/Api';

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const INCREMENT_ITEM = 'INCREMENT_ITEM';
export const DECREMENT_ITEM = 'DECREMENT_ITEM';
export const SET_CART = "SET_CART";

export const addItem = (product, token) => {
    return async (dispatch) => {
        try {
            const response = await Api({ url: "/cart/add", method: "PUT", data: { item: { product, qty: 1 } }, headers: { 'Authorization': `bearer ${token}` } })
            dispatch({ type: SET_CART, cart: response.data.cart });
            return {
                type: null
            };
        } catch (error) {
            console.log(error.response.data);
            return Promise.reject();
        }
    }
};

export const deleteItem = (item, token) => {
    return async (dispatch) => {
        try {
            await Api({ url: "/cart/remove", method: "PATCH", data: { item: item.product }, headers: { 'Authorization': `bearer ${token}` } })            
            dispatch({ type: DELETE_ITEM, productId: item.product._id })
        } catch (error) {
            console.error(error);
            return Promise.reject();
        }
    }
};

export const incrementItem = (productId, token) => {
    return async (dispatch) => {
        try {
            await Api({ url: "/cart/increment", method: "PATCH", data: { productId }, headers: { 'Authorization': `bearer ${token}` } });
            dispatch({ type: INCREMENT_ITEM, productId })
        } catch (error) {
            console.error(error);
            return Promise.reject();
        }
    }
};

export const decrementItem = (item, token) => {
    if (item.qty === 1) return {
        type: null
    };

    return async (dispatch) => {
        try {
            const productId = item.product._id;
            await Api({ url: "/cart/decrement", method: "PATCH", data: { productId }, headers: { 'Authorization': `bearer ${token}` } });
            dispatch({ type: DECREMENT_ITEM, productId });
        } catch (error) {
            console.error(error);
            return Promise.reject();
        }
    }
};

export const setCart = (cart) => {
    return {
        type: SET_CART,
        cart
    }
}