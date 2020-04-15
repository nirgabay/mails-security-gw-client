import {
    CLEAR_TABLE,
    DELETE_END,
    DELETE_START,
    RECEIVE_MAILS,
    REQUEST_MAILS,
    SELECT_ROWS,
    SET_FILTER, UNSELECT_ALL_ROWS, UPDATE_END, UPDATE_START
} from "../actionTypes";
import * as JsSearch from "js-search";

const initialValues = {
    selectedRows: [],
    mails: [],
    preFilterMails: [],
    isFetching: false,
    isDeleting: false,
    isUpdating: false,
    filter: '',
};

export default function (state = initialValues, action) {
    switch (action.type) {
        case CLEAR_TABLE:
            return initialValues;
        case SELECT_ROWS:
            const selectedRows = action.selectedRows;

            if (selectedRows.length > 1) {
                return Object.assign({}, state, {
                    selectedRows,
                });
            }

            if (state.selectedRows.includes(selectedRows[0])) {
                return Object.assign({}, state, {
                    selectedRows: state.selectedRows.filter((row) => row !== selectedRows[0]),
                });
            } else {
                return Object.assign({}, state, {
                    selectedRows:    [
                        ...state.selectedRows,
                        selectedRows[0]
                    ],
                });
            }
        case UNSELECT_ALL_ROWS:
            return Object.assign({}, state, {
                selectedRows: [],
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
                mails: state.mails.filter((mail) => !action.mailIds.includes(mail.id)),
                selectedRows: [],
            });
        case SET_FILTER: {
            const filter = action.filter.trim();

            if (!filter || filter === '') {
                return Object.assign({}, state, {
                    mails:  [...state.preFilterMails],
                    preFilterMails: [],
                    filter,
                });
            } else {
                let preFilterMails;

                if (filter.length === 1 && state.preFilterMails.length === 0) {
                    preFilterMails = Array.from(state.mails);
                } else {
                    preFilterMails = Array.from(state.preFilterMails);
                }

                return Object.assign({}, state, {
                    preFilterMails,
                    mails: getSearchInstance(state).search(filter),
                    filter,
                });
            }
        }
        case UPDATE_START: {
            return Object.assign({}, state, {
                isUpdating: true,
            });
        }
        case UPDATE_END: {
            return Object.assign({}, state, {
                isUpdating: false,
                mails: state.mails.map(mail => {
                    if (!action.mailIds.includes(mail.id)) {
                        return mail;
                    }

                    return {
                        ...mail,
                        status: action.status,
                    }
                })
            });
        }

        default:
            return state;
    }
}

function getSearchInstance(state) {
    const search = new JsSearch.Search('id');
    search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
    search.addIndex('uuid');
    search.addIndex('recipient');
    search.addIndex('sender');
    search.addIndex('subject');
    search.addIndex('category');
    search.addDocuments(state.preFilterMails);
    return search;
}

export function getLastSelectedMail(state) {
    if (state.mails.selectedRows.length > 0) {
        const lastSelectedRow = state.mails.selectedRows[state.mails.selectedRows.length - 1];
        return state.mails.mails[lastSelectedRow];
    } else {
        return null;
    }
}

export function getSelectedMailIds(state) {
    const mailsToLookup = state.mails.preFilterMails.length > 0 ? state.mails.preFilterMails : state.mails.mails;
    if (state.mails.selectedRows.length > 0) {
        return state.mails.selectedRows.map(row => mailsToLookup[row].id);
    }

    return [];
}
