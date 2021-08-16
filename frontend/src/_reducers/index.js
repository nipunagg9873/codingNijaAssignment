import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { doubts } from './doubts.reducer';
import { report } from './report.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    doubts,
    report,
    alert
});

export default rootReducer;