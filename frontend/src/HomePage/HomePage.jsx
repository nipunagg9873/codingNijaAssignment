import React, { useEffect } from 'react';
import { Link, Redirect, Route, Router, Switch, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers';

import {doubtActions, userActions, reportActions} from '../_actions';
import { Home } from '../Home';
import { RaiseDoubt } from '../RaiseDoubt';
import { SolveDoubts } from '../SolveDoubts';
import { Dashboard } from '../Dashboard';
import './style.scss';

import logo from './logo.svg';
function HomePage() {
    const user = useSelector(state => state.authentication.user);
    const doubts = useSelector(state => state.doubts);
    const report = useSelector(state => state.report);

    const dispatch = useDispatch();
    let { path, url } = useRouteMatch();

    if(!user) {
        return <Redirect to='/login' />
    }

    useEffect(() => {
        dispatch(doubtActions.getAll());
        if(user && user.role == 'TEACHER') {
            dispatch(reportActions.getReport());
        }
    }, []);

    //TODO Need to add transitions among tabs

    return (
        <div className="home">
            <Router history={history}>
                    <div className="header">
                        <div className="logo-holder">
                            <img src={logo} className="logo"></img>
                        </div>
                        <div className="tab-option">
                            <Link to={`${url}`}>Home</Link>
                        </div>
                        { ( user.role == 'STUDENT' ) && 
                            <div className="tab-option divider">
                                <Link to={`${url}/raiseDoubt`}>Raise Doubt</Link>
                            </div> }
                        { ( user.role == 'TA' || user.role == 'TEACHER' ) && 
                            <div className="tab-option divider">
                                <Link to={`${url}/solveDoubts`}>Solve Doubts</Link>
                            </div> }
                        { ( user.role == 'TEACHER' || user.role == 'ADMIN' ) && 
                            <div className="tab-option divider">
                                <Link to={`${url}/dashboard`}>Dashboard</Link>
                            </div> }
                        <div className="logout-button">
                            <Link to='/login'>Logout</Link> 
                        </div>    
                    </div>
                    <div className="page">
                        <Switch>
                            <Route exact path={`${path}/`}><Home user={user}></Home></Route>
                            <Route exact path={`${path}/raiseDoubt`}><RaiseDoubt user={user}></RaiseDoubt></Route>
                            <Route exact path={`${path}/solveDoubts`}><SolveDoubts user={user} doubts={doubts}></SolveDoubts></Route>
                            <Route exact path={`${path}/dashboard`}><Dashboard user={user} report={report}></Dashboard></Route>
                        </Switch>
                    </div>
            </Router>
        </div>
    );
}

export { HomePage };