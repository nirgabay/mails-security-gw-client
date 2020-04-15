import {
    CLEAR_TABLE,
    DELETE_END,
    DELETE_START,
    RECEIVE_MAILS,
    REQUEST_MAILS,
    SELECT_ROWS,
    SET_FILTER, UNSELECT_ALL_ROWS, UPDATE_END, UPDATE_START
} from "./actionTypes";
import Api from "../services/apiService";

const fetchBatchSize = process.env.REACT_APP_FETCH_BATCH_SIZE || 20;
const api = new Api();

function clearTable() {
    return {
        type: CLEAR_TABLE,
    }
}

export const selectRows = selectedRows => {
    return {
        type: SELECT_ROWS,
        selectedRows
    }
};

export const unselectAllRows = () => {
    return {
        type: UNSELECT_ALL_ROWS,
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

function endDelete(mailIds) {
    return {
        type: DELETE_END,
        mailIds
    }
}

function startUpdate() {
    return {
        type: UPDATE_START,
    }
}

function endUpdate(mailIds, status) {
    return {
        type: UPDATE_END,
        mailIds,
        status
    }
}

export function refreshTable() {
    return function (dispatch) {
        dispatch(clearTable());
        return dispatch(fetchMails());
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

export function deleteMails(mailIds) {
    return function (dispatch) {
        dispatch(startDelete());

        return api.deleteMails(mailIds)
            .then(
                () => dispatch(endDelete(mailIds)),
                error => console.log('An error occurred.', error)
            );
    }
}

export function updateMails(mailIds, status) {
    return function (dispatch) {
        dispatch(startUpdate());

        return api.updateMailsStatus(mailIds, status)
            .then(
                () => dispatch(endUpdate(mailIds, status)),
                error => console.log('An error occurred.', error)
            );
    }
}
