import {FETCH_MAILS} from "../actionTypes";
import makeData from "../../makeData";

const initialState = {
    mails: makeData(40),
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_MAILS: {
            const {startIndex} = action.payload;

            const mails = state.mails.concat(makeData(40));

            return {
                ...state,
                mails,
            };
        }

        default:
            return state;
    }
}
