import { SET_LOADING, GET_USERS, GET_SPECIFIC_USER, CREATE_USER, UPDATE_USER, DELETE_USER, LOGOUT } from '../actions/user-action';

const initialState = {
    loading: false,
    users: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

        case GET_USERS:
            return {
                ...state,
                users: payload,
                loading: false
            }

        case UPDATE_USER:
            return {
                ...state,
                users: [payload],
                loading: false
            }

        case GET_SPECIFIC_USER:
            return {
                ...state,
                users: payload,
                loading: false
            }

        case CREATE_USER:
            return {
                ...state,
                users: [payload, ...state.users],
                loading: false
            }


        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== payload),
                loading: false
            }

        case LOGOUT:
            return {
                ...state,
                users: [],
                loading: false
            }

        default:
            return state
    }
}