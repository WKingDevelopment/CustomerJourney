import React, { useContext, useEffect, useState } from 'react';
import { FieldsContext } from '../../../../contexts/fields-context';
import { PhasesContext } from '../../../../contexts/phases-context';
import { AddNewFieldForm } from './AddNewFieldSubForm';
import { ChecklistConfigurationForm } from './ChecklistConfigurationForm';
import { FieldsConfigurationForm } from './FieldsConfigurationForm';

const ItemConfigurationForm = () => {
    const [saveDisabled, setSaveDisabled] = useState<boolean>(true)
    const { phasesConfig, phasesDispatch } = useContext(PhasesContext);
    const { fieldsConfig, fieldsDispatch } = useContext(FieldsContext);

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
            <AddNewFieldForm phases={phasesConfig.phases.phaseList} onAddField={onAddField}/>
            <div>
                <FieldsConfigurationForm fields={fieldsConfig.fields.mainFields}/>
                <ChecklistConfigurationForm/>
            </div>
        </div>
    )
}

export { ItemConfigurationForm }