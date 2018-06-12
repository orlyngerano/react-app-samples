import {
    SET_ACTIONPROGRESS
} from '../actions/Main'

const initState = {
    actionProgress: false
};

const Main = (state = initState, action) => {
    switch (action.type) {
        case SET_ACTIONPROGRESS:{
            return Object.assign({}, state, { actionProgress: action.actionProgress});
        }      
        default:{
            return state;
        }
    }    
}

export default Main;