import React from "react";
import QuarantinedEmailsToolbar from "./QuarantinedEmailsToolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Styles} from "../Styles";
import QuarantinedEmailsTable from "./QuarantinedEmailsTable";
import QuarantinedEmailDetails from "./QuarantinedEmailDetails";

export default function QuarantinedEmailsLayout() {
    return (
        <Styles>
            <div className={'quarantined-emails-layout flex'}>
                <CssBaseline/>
                <QuarantinedEmailsToolbar/>
                <QuarantinedEmailsTable/>
                <QuarantinedEmailDetails/>
            </div>
        </Styles>
    );
}
