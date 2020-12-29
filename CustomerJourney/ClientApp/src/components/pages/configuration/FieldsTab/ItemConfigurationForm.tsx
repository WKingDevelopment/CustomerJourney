import React, { useContext, useEffect, useState } from 'react';
import { ConfigurationContext } from '../../../../contexts/configuration-context';
import { SessionContext } from '../../../../contexts/session-context';
import { AddNewFieldForm } from './AddNewFieldSubForm';
import { ChecklistConfigurationForm } from './ChecklistConfigurationForm';
import { FieldsConfigurationForm } from './FieldsConfigurationForm';

const ItemConfigurationForm = () => {
    const [saveDisabled, setSaveDisabled] = useState<boolean>(true)
    const { config, configDispatch } = useContext(ConfigurationContext);

    const onSave = () => {

    }

    const onAddField = () => {

    }

    return (
        <div>
            <div className="cont-horiz">
                <h2>Item Configuration</h2>
                {
                <button disabled={saveDisabled} onClick={onSave}>
                    Save
                </button>
                }
            </div>
            <AddNewFieldForm phases={config.phases.phaseList} onAddField={onAddField}/>
            <div>
                <FieldsConfigurationForm/>
                <ChecklistConfigurationForm/>
            </div>
        </div>
    )
}

export { ItemConfigurationForm }