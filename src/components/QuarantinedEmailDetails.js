import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import React from "react";
import {v4 as uuidv4} from "uuid";

export function QuarantinedEmailDetails(props) {
    return (
        <div className={'email-details-container'}>
            <Tabs>
                <TabList>
                    <Tab>DETAILS</Tab>
                </TabList>

                <TabPanel>
                    <p>E-mail information</p>

                    <div className={'flex'}>
                        <div className={'width-15'}>
                            <p>ID</p>
                            <p>Received Time</p>
                            <p>Recipient</p>
                            <p>Subject</p>
                            <p>Categorized As</p>
                        </div>
                        <div>
                            <p>{uuidv4()}</p>
                            <p>{new Date().toISOString()}</p>
                            <p>recipient@test.com</p>
                            <p>sender@test.com</p>
                            <p>Spam</p>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}
