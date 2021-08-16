import { doubtConstants } from '../_constants';

export function doubts(state = {}, action) {
    switch (action.type) {
        case doubtConstants.RAISE_DOUBT_REQUEST:
            return { raising: true };
        case doubtConstants.RAISE_DOUBT_SUCCESS:
            return { raised: true };
        case doubtConstants.RAISE_DOUBT_FAILURE:
            return {};
        case doubtConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case doubtConstants.GETALL_SUCCESS:
            return {
                items: action.doubts
            };
        case doubtConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case doubtConstants.UPDATE_DOUBT_REQUEST:
            return {
                ...state,
                items: state.items.map(doubt =>
                    doubt.id === action.id
                        ? { ...doubt, updating: true }
                        : doubt
                )
            };
        case doubtConstants.UPDATE_DOUBT_FAILURE:
            return {
                error: action.error
            };
        case doubtConstants.UPDATE_DOUBT_SUCCESS:
            return {
                items: state.items.map(doubt => doubt.id == action.doubt.id ? action.doubt : doubt)
            };
        case doubtConstants.DELETE_FAILURE:
            return {
                ...state,
                items: state.items.map(doubt => {
                    if (doubt.id === action.id) {
                        const { deleting, ...doubtCopy } = doubt;
                        return { ...doubtCopy, updateError: action.error };
                    }

                    return doubt;
                })
            };    
        default:
            return state
    }
}