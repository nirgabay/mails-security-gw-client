import {RECEIVE_MAILS, REQUEST_MAILS, SET_FILTER} from "./actionTypes";
import Api from "../services/apiService";

const fetchBatchSize = process.env.REACT_APP_FETCH_BATCH_SIZE || 100;
const api = new Api();

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
