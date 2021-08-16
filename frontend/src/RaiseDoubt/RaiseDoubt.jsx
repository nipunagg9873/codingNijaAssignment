import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, Route, Router, Switch, useRouteMatch } from 'react-router-dom';
import './style.scss';
import { doubtActions, userActions } from '../_actions';


function RaiseDoubt(props) {
    const user = props.user;
    const dispatch = useDispatch();
    if(!user) {
        useEffect(() => {
            dispatch(userActions.logout());
        }, []);
    }

    const [doubt, setDoubt] = useState({
        title: '',
        description: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const raising = useSelector(state => state.doubts.raising);
    const raised = useSelector(state => state.doubts.raised);

    if(raised) {
        return (
            <Redirect to="/home"></Redirect>
        );
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setDoubt(doubt => ({ ...doubt, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (doubt.title && doubt.description) {
            dispatch(doubtActions.raise(doubt,user));
        }
    }

    return (
        <div className="RaiseDoubt">
            <div className="heading-wrapper">
                <h2>Raise Doubt</h2>
            </div>
            <form name="form" onSubmit={handleSubmit} className="raise-doubt-form">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" value={doubt.title} onChange={handleChange} className={'form-control' + (submitted && !doubt.title ? ' is-invalid' : '')} />
                    {submitted && !doubt.title &&
                        <div className="invalid-feedback">Title is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" name="description" value={doubt.description} onChange={handleChange} className={'form-control description' + (submitted && !doubt.description ? ' is-invalid' : '')} />
                    {submitted && !doubt.title &&
                        <div className="invalid-feedback">Description is required</div>
                    }
                </div>
                <div className="form-group submit-button">
                    <button className="btn btn-primary btn">
                        {raising && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Ask Doubt
                    </button>
                </div>
            </form>
        </div>
    );
}

export { RaiseDoubt };
