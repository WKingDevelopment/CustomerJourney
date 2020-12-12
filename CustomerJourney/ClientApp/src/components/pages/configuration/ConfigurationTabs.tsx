import React, { useState } from 'react';
import {Tabs,Tab} from 'react-bootstrap';
import { constants } from '../../../constants/constants';
import { PhasesConfigurationForm } from './PhasesConfigurationForm';

const ConfigurationTabs = () => {
    const [key, setKey] = useState(constants.tabs.phases);
    return (
        <Tabs defaultActiveKey={constants.tabs.phases} activeKey={key} onSelect={(k) => {k && setKey(k)}}>
            <Tab eventKey={constants.tabs.phases} title={constants.tabs.phases}>
                <PhasesConfigurationForm/>
            </Tab>
        </Tabs>
    )
}

export { ConfigurationTabs }