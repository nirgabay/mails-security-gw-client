import React, {useEffect} from "react";
import {bindActionCreators} from "redux";
import {fetchMails} from "../redux/actions";
import {connect} from "react-redux";
import MaterialUITable from "./MaterialUITable";

function QuarantinedEmailsTable(props) {
    const {mails, fetchMails} = props;

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
                accessor: 'categorizedAs',
            },
        ],
        []
    );

    useEffect(() => {
        fetchMails();
    }, []);

    return (
        <div className={'quarantined-emails-table'}>
            <MaterialUITable columns={columns} data={mails} update={fetchMails}/>
        </div>
    );
}

const mapStateToProps = state => ({
    mails: state.mails.mails,
});

const mapDispatchToProps = dispatch => {
    return {
        fetchMails: bindActionCreators(fetchMails, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuarantinedEmailsTable);
