import { ADD_ITEM, DELETE_ITEM, INCREMENT_ITEM, DECREMENT_ITEM } from '../actions/cart';

const initialState = {
    items: []
}


export default (state=initialState, action) => {
    switch(action.type) {
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, { product: action.product, qty: 1 }]
            };
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.product._id !== action.productId)
            }
        case INCREMENT_ITEM:
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.product._id === action.productId) {
                        return {
                            ...item,
                            qty: item.qty + 1
                        }
                    }
                    return item
                })
            };
        case DECREMENT_ITEM:
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.product._id === action.productId) {
                        return {
                            ...item,
                            qty: item.qty - 1
                        }
                    }
                    return item;
                })
            };
        default:
            return state;
    }
}