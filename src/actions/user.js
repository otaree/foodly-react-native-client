import Api from '../config/Api';
import { setCart } from './cart';

export const SET_USER = 'SET_USER';
export const DELETE_USER = 'DELETE_USER';
export const SET_ADDRESS = 'SET_ADDRESS';
export const SET_TOKEN = 'SET_TOKEN';

export const signUp = ({ email, password }) => {
    return async (dispatch) => {
        try {
            const response = await Api.post('/signup', { email, password })
            return Promise.resolve(response.data)
          } catch (e) {
            return Promise.reject();
          }
    }
};

export const login = ({ email, password }) => {
    return async (dispatch) => {
        try {
            const response = await Api.post('/login', { email, password, cart: { items: [] } });
            const { token, user, cart } = response.data;
            console.log("CART!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", cart)
            dispatch({ type: SET_USER, user });
            dispatch({ type: SET_TOKEN, token });
            dispatch(setCart(cart))
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
}

export const setAddress = (address, token) => {
    return async (dispatch) => {
        try {
            const response = await Api({ url: '/user/setaddress', method: "POST", data: { ...address }, headers: { 'Authorization': `bearer ${token}` } });
            dispatch({ type: SET_ADDRESS, address });
        } catch (error) {
            console.log(error.response.data)
            return Promise.reject()
        }
    }
}