import { crudSaga } from 'redux-crud-store'
import fetch from 'isomorphic-fetch';
import { call, put, takeEvery, fork } from 'redux-saga/effects'
import {GET_CONFIG_REQUESTED} from '../actions/const';
import * as actions from '../actions/config';

export function* getData() {
  try {
    const response = yield call(fetch, 'api/config');
    const data = yield response.json();
    yield put(actions.getConfigDone(data));
  } catch (e) {
    yield put(actions.getConfigFailed(e));
  }
}

export function* getConfigSaga() {
  yield takeEvery(GET_CONFIG_REQUESTED, getData);
}

export default function rootSaga(client) {
  return function* rootSaga() {
    yield [
      fork(getConfigSaga),
      fork(crudSaga(client))
    ];
  }
}
