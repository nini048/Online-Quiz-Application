
import { INCREMENT, DECREMENT } from '../action/counterAction';
import { FETCH_USER_LOGIN_SUCCESS, FETCH_USER_LOGOUT_SUCCESS, FETCH_USER_UPDATE_SUCCESS, SET_USER_ID } from '../action/userAction';

const INITIAL_STATE = {
    account: {
        email: '',
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: '',
    },
    isAuthenticated: false

};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:


            return {
                ...state,
                account: {
                    email: action?.payload?.DT?.email,
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action.payload.DT.username,
                    image: action?.payload?.DT?.image,
                    role: action?.payload?.DT?.role,
                    

                },
                isAuthenticated: true
            };

        case FETCH_USER_LOGOUT_SUCCESS:
            return INITIAL_STATE;
        case FETCH_USER_UPDATE_SUCCESS:
            return {
                account: {
                    ...state.account,
                    username: action?.payload?.DT?.username,
                    image: action?.payload?.DT?.image,
                    role: action?.payload?.DT?.role,
                },
                isAuthenticated: true
            }
        case SET_USER_ID:
            return {
                ...state,
                account: {
                    ...state.account,
                    id: action.payload
                }
            };
        default: return state;
    }
};

export default userReducer;