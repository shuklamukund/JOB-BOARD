import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from '@redux-devtools/extension';
import { loadJobReducer,loadJobSingleReducer  } from './reducers/jobReducer';
import { loadJobTypeReducer } from './reducers/jobTypeReducer';
import { allUserReducer, userApplyJobReducer, userReducerLogout, userReducerProfile, userReducerSignIn } from './reducers/userReducer';

//combine reducers
const reducer = combineReducers({
    loadJobs: loadJobReducer,
    jobTypeAll: loadJobTypeReducer,
    signIn: userReducerSignIn,
    logOut: userReducerLogout,
    userProfile: userReducerProfile
});


//initial state
let initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;