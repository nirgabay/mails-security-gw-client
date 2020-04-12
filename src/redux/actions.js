import {FETCH_MAILS, SET_FILTER} from "./actionTypes";

export const fetchMails = startIndex => ({
    type: FETCH_MAILS,
    payload: {startIndex}
});

export const setFilter = filter => {
    return {
        type: SET_FILTER, payload: {filter}
    }
};
