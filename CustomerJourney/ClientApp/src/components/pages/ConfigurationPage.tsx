import React from 'react';
import { ConfigurationTabs } from './configuration/ConfigurationTabs';

const ConfigurationPage = () => {
    return (
        <div>
        <h1>Project Configuration</h1>
            <ConfigurationTabs/>
        </div>
        )
}

export { ConfigurationPage }