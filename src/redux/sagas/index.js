import { spawn } from 'redux-saga/effects';

import userSaga from './user-saga';

export default function* rootSaga() {
    console.log("Saga Working")
    yield spawn(userSaga);
}