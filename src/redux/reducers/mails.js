import {RECEIVE_MAILS, REQUEST_MAILS} from "../actionTypes";

export default function (state = {mails: [], isFetching: false}, action) {
    switch (action.type) {
        case REQUEST_MAILS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_MAILS:
            return Object.assign({}, state, {
                isFetching: false,
                mails: state.mails.concat(action.mails),
            });

        default:
            return state;
    }
}
