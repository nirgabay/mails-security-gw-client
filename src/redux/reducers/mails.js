import {DELETE_END, DELETE_START, RECEIVE_MAILS, REQUEST_MAILS, SELECT_ROW, SET_FILTER} from "../actionTypes";

export default function (state = {selectedRow: 0, mails: [], isFetching: false, isDeleting: false, filter: ''}, action) {
    switch (action.type) {
        case SELECT_ROW:
            return Object.assign({}, state, {
                selectedRow: action.selectedRow,
            });

        case REQUEST_MAILS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_MAILS:
            return Object.assign({}, state, {
                isFetching: false,
                mails: state.mails.concat(action.mails),
            });
        case DELETE_START:
            return Object.assign({}, state, {
                isDeleting: true,
            });
        case DELETE_END:
            return Object.assign({}, state, {
                isDeleting: false,
                mails: [
                    ...state.mails.slice(0, action.rowId),
                    ...state.mails.slice(action.rowId + 1)
                ],
            });
        case SET_FILTER: {
            return Object.assign({}, state, {
                filter: action.filter,
            });
        }

        default:
            return state;
    }
}
