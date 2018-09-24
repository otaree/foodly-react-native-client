import { SET_USER, SET_ADDRESS, SET_TOKEN, DELETE_USER } from '../actions/user';

const initialState = {
    token: '',
    user: null
};


export default (state=initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.token
            };
        case SET_ADDRESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    address: action.address
                }
            };
        case DELETE_USER:
            return initialState;
        default:
            return state;
    }
}
