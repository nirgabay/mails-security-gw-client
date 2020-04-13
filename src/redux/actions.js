import {DELETE_END, DELETE_START, RECEIVE_MAILS, REQUEST_MAILS, SELECT_ROW, SET_FILTER} from "./actionTypes";
import Api from "../services/apiService";

const fetchBatchSize = process.env.REACT_APP_FETCH_BATCH_SIZE || 100;
const api = new Api();

export const selectRow = selectedRow => {
    return {
        type: SELECT_ROW,
        selectedRow
    }
};

export const setFilter = filter => {
    return {
        type: SET_FILTER,
        filter
    }
};

function requestMails(offset) {
    return {
        type: REQUEST_MAILS,
        offset,
    }
}

function receiveMails(mails) {
    return {
        type: RECEIVE_MAILS,
        mails,
    }
}

function startDelete() {
    return {
        type: DELETE_START,
    }
}

function endDelete(rowId) {
    return {
        type: DELETE_END,
        rowId
    }
}

export function fetchMails(offset) {
    return function (dispatch) {
        dispatch(requestMails(offset));

        return api.getMails(offset, fetchBatchSize)
            .then(
                response => dispatch(receiveMails(response)),
                error => console.log('An error occurred.', error)
            );
    }
}

export function deleteMail(rowId, mailId) {
    return function (dispatch) {
        dispatch(startDelete());

        return api.deleteMail(mailId)
            .then(
                () => dispatch(endDelete(rowId)),
                error => console.log('An error occurred.', error)
            );
    }
}
