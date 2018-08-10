import React, {Component} from 'react';
import circle from '../assets/circle-outline.svg';
import pencil from '../assets/border-color.svg';
import check from '../assets/check.svg';
import '../themes/TodoItem.css';

const TodoItem = function(props) {
    let leftIconClass = 'LeftIconBg';
    let todoCellClass = 'TodoCell';
    let leftIcon = circle;
    let leftIconBtn = '';
    if(props.state == 'new'){
        todoCellClass += ' CellNewHighlight';
        leftIconClass += ' noBg';
        leftIconBtn = 'leftIconBtn';
    }else if(props.state == 'pending'){
        leftIconClass += ' noBg';
        leftIconBtn = 'leftIconBtn';
    }else if(props.state == 'donemark'){
        todoCellClass += ' CellDeleteHighlight';   
        leftIcon = check;     
    }else if(props.state == 'done'){
        leftIcon = check;     
    }
  return (
    <div className={ `${todoCellClass} ${ props.className }`}>
        <div className="CellLeftIcon">
            <div className={leftIconClass}>
                <img className={leftIconBtn} src={leftIcon} onClick={(event)=> props.onDelete()}/>
            </div>            
        </div>
        <div className="CellContent">
            <input className="CellText" type="text" value={props.description} onChange={(event)=>props.onUpdate(event.target.value)}/>
            { 
                props.state=='pending' || <div className="CellRightIcon">
                    <img src={pencil}/>
                </div>
            }
        </div>
    </div>
    );
}
  
export default TodoItem;
