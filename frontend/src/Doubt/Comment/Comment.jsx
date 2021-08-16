import React from 'react';
import './style.scss';

function Comment(props) {
    return (
        <div className="comment-wrapper">
                <span>{props.by && props.by.firstName} : {props.text}</span>
        </div>
    );
}

export { Comment };