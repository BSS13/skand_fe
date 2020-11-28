import { put, call, takeLatest, takeEvery} from 'redux-saga/effects';
import { SET_LOADING, GET_USERS,DELETE_USER_REQUESTED, CREATE_USER, UPDATE_USER, UPDATE_USER_REQUESTED, DELETE_USER, GET_USERS_REQUESTED, GET_SPECIFIC_USER, GET_SPECIFIC_USER_REQUESTED, CREATE_USER_REQUESTED} from '../actions/user-action';
import { getAllUsers, getUserById, deleteUserById,createNewUser, updateExistingUser } from '../api/user-api';

function* getUsers () {
    yield put ({ type: SET_LOADING })
    const users = yield call(getAllUsers)
    yield put({type:GET_USERS, payload: users})
}

function* getSpecificUser ({payload}) {
    yield put ({type: SET_LOADING})
    const user = yield call(getUserById, payload)
    yield put({type: GET_SPECIFIC_USER, payload: user})
}

function* deleteUser ({payload}) {
    yield put ({type : SET_LOADING })
    yield call(deleteUserById, payload)
    yield put ({ type:DELETE_USER, payload})
}

function* createUser ({payload}) {
    yield put({type: SET_LOADING})
    yield call(createNewUser,payload)
    yield put ({type: CREATE_USER,payload})
}

function* updateUser ({payload}) {
    yield put({type: SET_LOADING})
    yield call(updateExistingUser,payload)
    yield put ({type: UPDATE_USER, payload})
}

export default function* userSaga() {
    yield takeEvery(GET_USERS_REQUESTED,getUsers)
    yield takeEvery(GET_SPECIFIC_USER_REQUESTED, getSpecificUser)
    yield takeEvery(DELETE_USER_REQUESTED, deleteUser)
    yield takeEvery(CREATE_USER_REQUESTED, createUser)
    yield takeEvery(UPDATE_USER_REQUESTED, updateUser)
}