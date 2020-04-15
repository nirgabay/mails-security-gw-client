import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import React from "react";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {getLastSelectedMail} from "../redux/reducers/mails";

const useStyles = makeStyles((theme) => ({
    header: {
        fontWeight: 800,
        color: 'darkblue',
    },
}));

function QuarantinedEmailDetails(props) {
    const classes = useStyles();
    const {lastSelectedMail} = props;

    const getMailPropertyValue = (key) => {
        return lastSelectedMail ?  lastSelectedMail[key] : 'N/A';
    };

    return (
        <div className={'email-details-container'}>
            <Tabs>
                <TabList>
                    <Tab>DETAILS</Tab>
                </TabList>

                <TabPanel>
                    <p className={classes.header}>E-mail information</p>

                    <div className={'flex'}>
                        <div className={'width-15'}>
                            <p>ID</p>
                            <p>Received Time</p>
                            <p>Recipient</p>
                            <p>Sender</p>
                            <p>Subject</p>
                            <p>Categorized As</p>
                        </div>
                        <div>
                            <p>{getMailPropertyValue('uuid')}</p>
                            <p>{getMailPropertyValue('sentTime')}</p>
                            <p>{getMailPropertyValue('recipient')}</p>
                            <p>{getMailPropertyValue('sender')}</p>
                            <p>{getMailPropertyValue('subject')}</p>
                            <p>{getMailPropertyValue('category')}</p>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}

const mapStateToProps = state => ({
    lastSelectedMail: getLastSelectedMail(state),
});

export default connect(mapStateToProps, null)(QuarantinedEmailDetails);
