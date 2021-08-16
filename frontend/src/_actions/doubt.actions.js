import { doubtConstants } from '../_constants';
import { doubtService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const doubtActions = {
    raise,
    update,
    getAll,
    delete: _delete
};

function raise(doubt, user) {
    return dispatch => {
        dispatch(request(doubt, user));
        
        doubtService.raise(doubt, user)
            .then(
                doubt => { 
                    dispatch(success(doubt));  
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(doubt, user) { return { type: doubtConstants.RAISE_DOUBT_REQUEST, doubt, user } }
    function success(doubt, user) { return { type: doubtConstants.RAISE_DOUBT_SUCCESS, doubt, user } }
    function failure(error) { return { type: doubtConstants.RAISE_DOUBT_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        doubtService.getAll()
            .then(
                doubts => dispatch(success(doubts)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: doubtConstants.GETALL_REQUEST } }
    function success(doubts) { return { type: doubtConstants.GETALL_SUCCESS, doubts } }
    function failure(error) { return { type: doubtConstants.GETALL_FAILURE, error } }
}

function update(doubt, user) {
    return dispatch => {
        dispatch(request(doubt, user));
        
        doubtService.update(doubt)
            .then(
                doubt => { 
                    dispatch(success(doubt));
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(doubt, user) { return { type: doubtConstants.UPDATE_DOUBT_REQUEST, doubt, user } }
    function success(doubt, user) { return { type: doubtConstants.UPDATE_DOUBT_SUCCESS, doubt, user } }
    function failure(error) { return { type: doubtConstants.UPDATE_DOUBT_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}