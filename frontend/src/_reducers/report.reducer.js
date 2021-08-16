import { reportConstants } from '../_constants';

let currentReport = JSON.parse(localStorage.getItem('report'));
const initialState = report ? { report : currentReport } : {};

export function report(state = initialState, action) {
    switch (action.type) {
        case reportConstants.GET_REPORT_FAILURE:
            return {
                error: action.error
            };
        case reportConstants.GET_REPORT_REQUEST:
            return {
                ...state,
                fetching: true,
                report: {}
            };
        case reportConstants.GET_REPORT_SUCCESS:
            return {
                ...state,
                fetching: false,
                report: action.report
            };
        default:
            return state
    }
}