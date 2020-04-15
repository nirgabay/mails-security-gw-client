import React from "react";
import MaterialUITable from "./MaterialUITable";

export default function QuarantinedEmailsTable() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'MAIL_ID',
                accessor: 'id',
            },
            {
                Header: 'ID',
                accessor: 'uuid',
            },
            {
                Header: 'Sent Time',
                accessor: 'sentTime',
            },
            {
                Header: 'Recipient',
                accessor: 'recipient',
            },
            {
                Header: 'Sender',
                accessor: 'sender',
            },
            {
                Header: 'Subject',
                accessor: 'subject',
            },
            {
                Header: 'Categorized As',
                accessor: 'category',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
        ],
        []
    );

    return (
        <div className={'quarantined-emails-table'}>
            <MaterialUITable
                columns={columns}
            />
        </div>
    );
}
