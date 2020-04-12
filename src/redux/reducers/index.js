import { combineReducers } from "redux";
import quarantinedEmailsFilter from "./quarantinedEmailsFilter";
import mails from "./mails";

export default combineReducers({ mails, quarantinedEmailsFilter });
