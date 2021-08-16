import React, {useState} from 'react';
import {Comment} from './Comment';
import './style.scss';
import {doubtActions} from '../_actions'
import { useDispatch, useSelector } from 'react-redux';

function Doubt(props) {
    const dispatch = useDispatch();
    let [doubt, setDoubt] = useState({
        doubt: props.doubt,
        comment: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setDoubt(doubt => ({ ...doubt, [name]: value }));
    }

    let onAddComment = function(event) {
        event.preventDefault();
        if(!doubt.comment) {
            return;
        }
        doubt.doubt.comments.push({
            text: doubt.comment,
            by: props.user
        });
        dispatch(doubtActions.update(doubt.doubt));
        setDoubt(doubt => ({ ...doubt, comment: '' }));        
    }

    return (
        <div className={ "doubt-wrapper " + ( ( props.mode && props.mode === 'solving' ) ? "solving" : "" ) } >
            <div className="details-wrapper">
                <div className="doubt-header">
                    <div className="title-wrapper">
                        <span>{doubt.doubt.title}</span>
                    </div>
                    {doubt.doubt.status && doubt.doubt.status === 'answered' &&
                        <div className="resolved"> Resolved </div>
                    }
                </div>
                <div className="description-wrapper">
                    <span>{doubt.doubt.description}</span>
                </div>
                <div className="info-wrapper">
                    <span>Asked By: {doubt.doubt.createdBy && ( doubt.doubt.createdBy.firstName + ' ' + doubt.doubt.createdBy.lastName ) } on { new Date(doubt.doubt.createdAt).toLocaleDateString([], { month: 'long', day: 'numeric' , hour: '2-digit', minute: '2-digit'}) }</span>
                </div>
                {doubt.doubt.status && doubt.doubt.status === 'answered' && doubt.doubt.answer &&
                    <div className="answer">
                        <div className="answer-text">
                            <label className="answer-label">Answer: </label>
                            <span className="answer-text"> {doubt.doubt.answer.text} </span>
                        </div>
                        <span className="answer-info"> Answered By: {doubt.doubt.answer.by.firstName} on { new Date(doubt.doubt.answer.at).toLocaleDateString([], { month: 'long', day: 'numeric' , hour: '2-digit', minute: '2-digit'}) } </span>
                    </div>
                }
            </div>
            <div className="comments">
                    {doubt.doubt.comments && doubt.doubt.comments.length && (
                            <div className="comments-list">
                                <span> {doubt.doubt.comments.length} { doubt.doubt.comments.length > 1 ? 'Comments' : 'Comment' } </span> 
                                <ul>
                                    {doubt.doubt.comments.map((comment, index) =>
                                        <Comment {...comment} key={index}></Comment>
                                    )}
                                </ul>
                            </div>
                        ) || ''
                    }
                { ( !props.mode || props.mode != 'solving' ) && 
                    <div className="add-comment">
                        <input type="text" className="comment-input" placeholder="Add comment" value={doubt.comment} onChange={handleChange} name="comment"></input>
                        <button className="add-comment" onClick={onAddComment}>Comment</button>
                    </div>
                }
            </div>
        </div>
    );
}

export { Doubt };