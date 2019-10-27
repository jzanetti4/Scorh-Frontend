import { put, call, take,fork,takeEvery, takeLatest  } from 'redux-saga/effects';

import {SUCCESS_TASK,ERROR_TASK,SUCCESS_PROCEDURE,ERROR_PROCEDURE} from '../reducer/tasks.redux'




function* createTask(action) {
    try{
        yield put({type:SUCCESS_TASK,payload:action.payload})
    }catch (e) {
        console.log(e)
        yield put({type: ERROR_TASK,});
    }
}



export default function* rootSaga() {
    // const action=yield takeLatest('searchRequest', searchItem);
    const action=yield takeLatest('createTask', createTask)
}
