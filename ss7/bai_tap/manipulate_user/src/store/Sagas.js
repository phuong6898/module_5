import { call, put, takeEvery } from "redux-saga/effects";
import { fetchUsers, deleteUser } from "../service/UserService";
import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
} from "./Action";

function* fetchUsersSaga() {
    try {
        const response = yield call(fetchUsers);
        yield put({ type: GET_USERS_SUCCESS, payload: response });
    } catch (error) {
        yield put({ type: GET_USERS_FAILURE, payload: error.message });
    }
}

function* deleteUserSaga(action) {
    try {
        yield call(deleteUser, action.payload);
        yield put({ type: DELETE_USER_SUCCESS, payload: action.payload });
    } catch (error) {
        yield put({ type: DELETE_USER_FAILURE, payload: error.message });
    }
}

export default function* rootSaga() {
    yield takeEvery(GET_USERS_REQUEST, fetchUsersSaga);
    yield takeEvery(DELETE_USER_REQUEST, deleteUserSaga);
}