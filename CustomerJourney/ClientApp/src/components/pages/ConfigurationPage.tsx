import React from 'react';
import { ConfigurationTabs } from './configuration/ConfigurationTabs';

const ConfigurationPage = () => {
    return (
        <div className="page">
        <h4>Project Configuration</h4>
            <ConfigurationTabs/>
        </div>
        )
}

export { ConfigurationPage }