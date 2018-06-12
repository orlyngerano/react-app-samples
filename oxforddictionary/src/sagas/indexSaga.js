
import { all, fork } from 'redux-saga/effects'

import {
    searchSynonymsSaga,
    definitionSaga
}  from './WordSaga';

export default function* rootSaga() {
    yield all([
        fork(searchSynonymsSaga),
        fork(definitionSaga)
    ])
}