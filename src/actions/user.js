import Api from '../config/Api';

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
            dispatch({ type: SET_USER, user });
            dispatch({ type: SET_TOKEN, token });
            // TODO: dispatch set cart
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
}