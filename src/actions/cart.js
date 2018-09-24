export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const INCREMENT_ITEM = 'INCREMENT_ITEM';
export const DECREMENT_ITEM = 'DECREMENT_ITEM';

export const addItem = (product) => ({
    type: ADD_ITEM,
    product
});

export const deleteItem = (productId) => ({
    type: DELETE_ITEM,
    productId
});

export const incrementItem = (productId) => ({
    type: INCREMENT_ITEM,
    productId
});

export const decrementItem = (item) => {
    if (item.qty === 1) return {
        type: null
    };

    return {
        type: DECREMENT_ITEM,
        productId: item.product._id
    };
};