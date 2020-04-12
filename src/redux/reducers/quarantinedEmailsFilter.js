import { SET_FILTER } from "../actionTypes";

const initialState = '';

export default function quarantinedEmailsFilter(state = initialState, action) {
    switch (action.type) {
        case SET_FILTER: {
            return action.payload.filter;
        }
        default: {
            return state;
        }
    }
};
