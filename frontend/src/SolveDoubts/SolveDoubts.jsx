import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { doubtActions, userActions } from '../_actions';
import { Doubt } from '../Doubt'
import _ from 'underscore';
import './style.scss';

function SolveDoubts(props) {
    const dispatch = useDispatch();

    let [state, setState] = useState({
        user: props.user,
        doubts: props.doubts,
        answerText: ''
    });

    const user = props.user;
    const doubts = props.doubts;

    function handleChange(e) {
        const { name, value } = e.target;
        setState(state => ({ ...state, [name]: value }));
    }

    let changeDoubtStatus = function(doubt, status) {
        doubt.history = doubt.history || [];
        doubt.history.push({
            from: doubt.status,
            to: status,
            by: user.id,
            at: new Date()
        });
        doubt.status = status;
        dispatch(doubtActions.update(doubt));
    };

    let onSubmitAnswer = function(event) {
        event.preventDefault();
        if(!state.answerText) {
            return;
        }
        doubtBeingSolved.answer = {
            text: state.answerText,
            by: user.id,
            at: new Date()
        };
        changeDoubtStatus(doubtBeingSolved, "answered");
        user.solvingDoubt = "";
        dispatch(userActions.update(user));
        setState({
            ...state,
            answerText: ''
        })
    };

    if(!user) {
        useEffect(() => {
            dispatch(userActions.logout());
        }, []);
    }

    let acceptDoubt = function(doubt) {
        user.solvingDoubt = doubt.id;
        dispatch(userActions.update(user));
        changeDoubtStatus(doubt,"accepted");
    };

    let onEscalate = function() {
        user.solvingDoubt = "";
        dispatch(userActions.update(user));
        changeDoubtStatus(doubtBeingSolved,"escalated");
    };

    if(user && user.solvingDoubt && doubts && doubts.items) {
        var doubtBeingSolved = _.findWhere(doubts.items, {id: user.solvingDoubt});
    }

    if( doubts && doubts.items ) {
        doubts.filteredItems = doubts.items &&  _.filter( doubts.items, (doubt) => doubt.status === "open" || doubt.status === "escalated" );
    }

    //TODO Need to add a view in case no doubts are present to solve
    //TODO Loader has to be integrated when doubts are being loaded

    return (
        <div className="solve-doubts-wrapper">
            <div className="heading-wrapper">
                <h2>Solve Doubts</h2>
            </div>
            <div className="doubts-wrapper">
                {doubts && doubts.loading && <em>Loading doubts...</em>}
                {doubts && doubts.error && <span className="text-danger">ERROR: {doubts.error}</span>}
                { user && user.solvingDoubt && ( doubtBeingSolved && (
                    <div className="solving-doubt-wrapper">
                        <div className="doubt-holder">
                            <Doubt doubt={doubtBeingSolved} user={user} mode ="solving" ></Doubt>
                        </div>
                        <div className="right-holder">
                            <div className="answer-holder">
                                <span className="answer-label">Answer</span>
                                <input type="text" className="answer-input" placeholder="Answer" value={state.answerText} onChange={handleChange} name="answerText"></input>
                                <button className="submit-answer" onClick={onSubmitAnswer}>Answer</button>
                            </div>
                            <div className="escalate-holder">
                                <button className="escalate" onClick={onEscalate}>Escalate</button>
                            </div>
                        </div>
                    </div>
                ) )
                || ( doubts.filteredItems &&
                        <ul className="doubt-list">
                            {doubts.filteredItems.map((doubt, index) =>
                                <div className="doubt-list-item" key={doubt.id}>
                                    <span className="doubt-title">{doubt.title}</span>
                                    <div className="accept-doubt">
                                        <button className="accept-doubt-button" onClick={() => acceptDoubt(doubt) }>Accept</button>
                                    </div>
                                </div>
                            )}
                        </ul>
                    )
                }
            </div>
        </div>
    );
}

export { SolveDoubts };