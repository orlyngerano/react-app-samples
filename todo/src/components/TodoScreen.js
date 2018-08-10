import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SAVE_TODO, SET_STATE_ALL, SET_EXISTING_STATE } from '../actions/Todo';
import { Util } from '../helpers/Util';
import TodoItem from '../components/TodoItem';
import plus from '../assets/plus.svg';
import '../themes/TodoScreen.css';

class TodoScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numTasks: 0,
            todos: []
        };
    }

    static getDerivedStateFromProps(props, state) {
        state.numTasks = props.todos.length;
        state.todos = props.todos;

        return state;
    }

    onDelete = (todo, done) => {
        todo.state = 'donemark';
        
        this.props.save(todo);
        setTimeout(()=>{
            todo.state = 'done';
            this.props.save(todo);    
        }, 800);
    }

    onUpdate = (todo, description) => {
        todo.description = description;
        this.props.save(todo);
    }

    render() {
        return (
            <div className="AppContainer">
                <div className="TitleBar">
                    <div className="TaskTitle">TASKS</div>
                    <div><span className="Owner">Nico Smit's list</span>&nbsp;<span className="TaskCount">({this.state.numTasks})</span></div>
                </div>
                <div className="TodosContainer">
                    <div className="AddTaskButton" onClick={() => {
                        
                        this.props.setTodoStateOfExisting('new', 'pending');

                        this.props.save({
                            id: Util.uuidv4(),
                            description: '',
                            state: 'new'
                        });
                    }}>
                        <div className="PlusIcon">
                            <img src={plus} className="AddTaskButtonIcon"/>
                        </div>
                        Add a task
                    </div>
                    <div>
                        {
                            this.state.todos.map((todo, index) => {
                                return (
                                    <TodoItem
                                        key={index}
                                        state={todo.state}
                                        description={todo.description} onDelete={() => this.onDelete(todo, true)}
                                        onUpdate={(description) => this.onUpdate(todo, description)}>
                                    </TodoItem>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let todos = Object.keys(state.Todo.todos).filter((todoKey) => state.Todo.todos[todoKey].state != 'done').map((todoKey) => {
        let todo = Object.assign({},state.Todo.todos[todoKey]);
        return todo;
    });

    todos.reverse();
     
    return {
        todos: todos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: function (todo) {
            dispatch({ type: SAVE_TODO, todo: todo });
        },
        setTodosState: function(state){
            dispatch({ type: SET_STATE_ALL, state: state });
        },
        setTodoStateOfExisting: function(previousState, newState){
            dispatch({ type: SET_EXISTING_STATE, previousState: previousState, newState: newState});
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoScreen);
