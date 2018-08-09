import {SAVE_TODO, SET_STATE_ALL, SET_EXISTING_STATE} from '../actions/Todo';

const initState = {
    todos: {}
};

export default (state = initState, action)=>{
    let todos = {};
    switch(action.type){
        case SAVE_TODO:
            todos = Object.assign({}, state.todos);
            todos[action.todo.id] = action.todo;
            let newObj = Object.assign({}, state, {todos: todos});
            return newObj;
        case SET_STATE_ALL:
            todos = Object.assign({}, state.todos);
            todos = Object.keys(todos).map((todoKey)=>{
                let todo = Object.assign({}, todos[todoKey]);
                todo.state=action.state;
                return todo;
            });
            return Object.assign({}, state, {todos: todos});            
        case SET_EXISTING_STATE:
            todos = Object.assign({}, state.todos);
            Object.keys(todos).forEach((todoKey)=>{
                let todo = todos[todoKey];
                if(todo.state==action.previousState){
                   todo.state = action.newState; 
                }
            });
            return Object.assign({}, state, {todos: todos});            
        default:{
                return state;
            }
    }
}