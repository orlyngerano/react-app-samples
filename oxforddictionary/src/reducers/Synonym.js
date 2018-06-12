import {
    RECEIVE_SYNONYMS,
    RECEIVE_DEFINITION,
    REQUEST_SYNONYM_RESET
} from '../actions/Word'

const initState = {
    synonyms: [],
    searchWord: '',
    wordDefinitions: [],
};

const Synonym = (state = initState, action) => {
    switch (action.type) {       
        case RECEIVE_SYNONYMS:{
            return Object.assign({}, state, { synonyms: action.synonyms, searchWord: action.searchWord});
        }
        case RECEIVE_DEFINITION:{
            return Object.assign({}, state, { wordDefinitions: action.wordDefinitions});
        }
        case REQUEST_SYNONYM_RESET:{
            return initState;
        }
        default:{
            return state;
        }
    }    
}

export default Synonym;