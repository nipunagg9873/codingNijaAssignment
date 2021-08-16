import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { doubtActions } from '../_actions';
import { Doubt } from '../Doubt'
import _ from 'underscore';
import './style.scss';

function Home(props) {
    const user = props.user;
    const doubts = useSelector(state => state.doubts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(doubtActions.getAll());
    }, []);

    //TODO Freshly raised doubts should come at top

    return (
        <div className="home-wrapper">
            <div className="heading-wrapper">
                <h2>Home</h2>
            </div>
            <div className="doubts-wrapper">
                {doubts && doubts.loading && <em>Loading doubts...</em>}
                {doubts && doubts.error && <span className="text-danger">ERROR: {doubts.error}</span>}
                {doubts && doubts.items &&
                    <ul className="doubt-list">
                        <div className="count-info" key="count-info"><span> {doubts.items.length + ' ' + ( doubts.items.length > 1 ? 'Doubts' : 'Doubt' ) } </span> </div>
                        {doubts.items.map((doubt, index) =>
                            <Doubt doubt={doubt} key={doubt.id} user={user}></Doubt>
                        )}
                    </ul>
                }
            </div>
        </div>
    );
}

export { Home };