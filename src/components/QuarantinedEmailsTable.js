import React, {useEffect} from "react";
import {bindActionCreators} from "redux";
import {fetchMails, selectRow} from "../redux/actions";
import {connect} from "react-redux";
import MaterialUITable from "./MaterialUITable";

function QuarantinedEmailsTable(props) {
    const {mails, fetchMails, selectRow, selectedRow, deleteMail} = props;

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
        ],
        []
    );

    useEffect(() => {
        fetchMails();
    }, []);

    return (
        <div className={'quarantined-emails-table'}>
            <MaterialUITable
                columns={columns}
                data={mails}
                update={fetchMails}
                selectRow={selectRow}
                selectedRow={selectedRow}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    mails: state.mails.mails,
    selectedRow: state.mails.selectedRow
});

const mapDispatchToProps = dispatch => {
    return {
        selectRow: bindActionCreators(selectRow, dispatch),
        fetchMails: bindActionCreators(fetchMails, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuarantinedEmailsTable);
