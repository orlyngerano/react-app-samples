import {serverApi1} from '../config/config';
import {REQUEST_SYNONYMS, RECEIVE_SYNONYMS, REQUEST_DEFINITION, RECEIVE_DEFINITION} from '../actions/Word';
import {SET_ACTIONPROGRESS} from '../actions/Main';
import { put, takeEvery} from 'redux-saga/effects'


function getSynonymsFromRaw(raw){
    let synonyms = [];
    raw.results.forEach(function(result){
        result.lexicalEntries.forEach(function(lexicalEntry){
            lexicalEntry.entries.forEach(function(entry){
                entry.senses.forEach(function(sense){
                    synonyms = synonyms.concat(sense.synonyms);
                });
            }); 
        });
    });
    return synonyms;
}

function getDefinitionsFromRaw(raw){
    let definitions = [];
    raw.results.forEach(function(result){
        result.lexicalEntries.forEach(function(lexicalEntry){
            lexicalEntry.entries.forEach(function(entry){
                entry.senses.forEach(function(sense){
                    definitions = definitions.concat(sense.definitions);
                });
            }); 
        });
    });
    return definitions;
}

function* searchSynonyms(action) {
    yield put({ type: SET_ACTIONPROGRESS, actionProgress: true });
    

    let synonyms = [];
    try{
        const response = yield serverApi1.get(`/synonym.php?text=${action.word}`);
        let synonyms = getSynonymsFromRaw(response.data);
    }catch(e){}    
    
    yield put({ type: SET_ACTIONPROGRESS, actionProgress: false });    
    yield put({ type: RECEIVE_SYNONYMS, synonyms: synonyms, searchWord: action.word});
}


function* definition(action) {
    yield put({ type: SET_ACTIONPROGRESS, actionProgress: true });
    
    let definitions = [];
    try{
        const response = yield serverApi1.get(`/definition.php?text=${action.word}`);
        definitions = getDefinitionsFromRaw(response.data);
    }catch(e){}
    
    yield put({ type: SET_ACTIONPROGRESS, actionProgress: false });    
    yield put({ type: RECEIVE_DEFINITION, wordDefinitions: definitions });
}


export function* searchSynonymsSaga() {
    yield takeEvery(REQUEST_SYNONYMS, searchSynonyms);
}

export function* definitionSaga() {
    yield takeEvery(REQUEST_DEFINITION, definition);
}


