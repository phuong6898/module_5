import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE
} from "./Action";

const initialState = {
    users: [],
    loading: false,
    error: null,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };
        case GET_USERS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case DELETE_USER_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.filter(u => u.id !== action.payload)
            };
        case DELETE_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}

export default rootReducer;
