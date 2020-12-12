import React, { useState } from 'react';
import {Tabs,Tab} from 'react-bootstrap';
import { constants } from '../../../constants/constants';
import { PhasesConfigurationForm } from './PhasesConfigurationForm';

const ConfigurationTabs = () => {
    const [key, setKey] = useState(constants.tabs.test);
    return (
        <Tabs defaultActiveKey={constants.tabs.test} activeKey={key} onSelect={(k) => {k && setKey(k)}}>
            <Tab eventKey={constants.tabs.test} title={constants.tabs.test}>
                <PhasesConfigurationForm/>
            </Tab>
        </Tabs>
    )
}

export { ConfigurationTabs }