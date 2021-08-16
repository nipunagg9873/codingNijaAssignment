import {reportConstants} from '../_constants';
import {reportService} from '../_services';

export const reportActions = {
    getReport
};

function getReport() {
    return dispatch => {
        dispatch(request());

        reportService.getReport()
            .then(
                report => dispatch(success(report)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: reportConstants.GET_REPORT_REQUEST } }
    function success(report) { return { type: reportConstants.GET_REPORT_SUCCESS, report } }
    function failure(error) { return { type: reportConstants.GET_REPORT_FAILURE, error } }
}