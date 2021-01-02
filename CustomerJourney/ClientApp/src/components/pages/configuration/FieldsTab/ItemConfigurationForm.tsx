import React, { useContext, useEffect, useState } from 'react';
import { FieldsContext } from '../../../../contexts/fields-context';
import { PhasesContext } from '../../../../contexts/phases-context';
import { Field } from '../../../../data classes/Field';
import { arrayComparer } from '../../../../general_Functions/array_Functions';
import { isEmptyOrSpace } from '../../../../general_Functions/validations_Functions';
import { AddNewFieldForm } from './AddNewFieldSubForm';
import { ChecklistConfigurationForm } from './ChecklistConfigurationForm';
import { FieldsConfigurationForm } from './FieldsConfigurationForm';

const ItemConfigurationForm = () => {
    const [saveDisabled, setSaveDisabled] = useState<boolean>(true)
    const { phasesConfig, phasesDispatch } = useContext(PhasesContext);
    const { fieldsConfig, fieldsDispatch } = useContext(FieldsContext);
    const [mainFields, setMainFields] = useState<Field[]>(fieldsConfig.fields.mainFields)
    const [checklistFields, setChecklistFields] = useState<Field[]>(fieldsConfig.fields.checklistFields)
    const [error, setError] = useState<string>('');

    useEffect(() => {
        let same = arrayComparer(fieldsConfig.fields.mainFields,mainFields);
        same = arrayComparer(fieldsConfig.fields.checklistFields,checklistFields);
        if (!same && saveDisabled) {
            setSaveDisabled(false);
        } else if (same && !saveDisabled) {
            setSaveDisabled(true);
        }
      }, [JSON.stringify(mainFields), JSON.stringify(checklistFields)]);

    const onSave = () => {

    }

    const onAddField = (newField:Field):boolean => {
        console.log(1,newField)
        const fieldError = (newField.type === 'Checklist') ? newField.ValidityCheck(fieldsConfig.fields.checklistFields) : newField.ValidityCheck(fieldsConfig.fields.mainFields);
        console.log(2,newField)
        if(isEmptyOrSpace(fieldError)) {
            if(newField.type === 'Checklist'){
                setChecklistFields(checklistFields.concat([newField]));
            } else {
                setMainFields(mainFields.concat([newField]));
            }
            return true
        } else {
            setError(fieldError);
            return false;
        }
    }

    const onUpdateFields = (fields:Field[], type:string) => {
        if (type === 'Main') {
            setMainFields(fields)
        } else {
            setChecklistFields(fields)
        }
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
            <div>
                {error && <div>{error}</div>}
                <AddNewFieldForm phases={phasesConfig.phases.phaseList} onAddField={onAddField}/>
            </div>
            <div>
                <FieldsConfigurationForm onUpdateFields={onUpdateFields} fields={fieldsConfig.fields.mainFields}/>
                <ChecklistConfigurationForm/>
            </div>
        </div>
    )
}

export { ItemConfigurationForm }