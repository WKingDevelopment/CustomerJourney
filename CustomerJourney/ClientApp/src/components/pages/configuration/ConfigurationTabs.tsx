import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { constants } from '../../../constants/constants';
import { PhasesConfigurationForm } from './PhaseTab/PhasesConfigurationForm';

const ConfigurationTabs = () => {
    const [key, setKey] = useState(constants.tabs.phases);
    return (
        <div>
            <Tabs>
            <TabList>
                <Tab>{constants.tabs.phases}</Tab>
            </TabList>
        
            <TabPanel>
                <PhasesConfigurationForm/>
            </TabPanel>
        </Tabs>
        </div>
    )
}

export { ConfigurationTabs }