import React, { useContext, useEffect, useState } from 'react';
import { apiPutFields } from '../../../../apiCalls/Fields';
import { FieldsContext } from '../../../../contexts/fields-context';
import { PhasesContext } from '../../../../contexts/phases-context';
import { SessionContext } from '../../../../contexts/session-context';
import { Field } from '../../../../data classes/Field';
import { Fields } from '../../../../data classes/Fields';
import { arrayComparer } from '../../../../general_Functions/array_Functions';
import { isEmptyOrSpace } from '../../../../general_Functions/validations_Functions';
import { AddNewFieldForm } from './AddNewFieldSubForm';
import { FieldsConfigurationForm } from './FieldsConfigurationForm';

const ItemConfigurationForm = () => {
    const [saveDisabled, setSaveDisabled] = useState<boolean>(true);
    const { session } = useContext(SessionContext);
    const { phasesConfig } = useContext(PhasesContext);
    const { fieldsConfig } = useContext(FieldsContext);
    const [mainFields, setMainFields] = useState<Field[]>(fieldsConfig.fields.mainFields)
    const [checklistFields, setChecklistFields] = useState<Field[]>(fieldsConfig.fields.checklistFields)
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const mainSame = arrayComparer(fieldsConfig.fields.mainFields,mainFields);
        const checklistSame = arrayComparer(fieldsConfig.fields.checklistFields,checklistFields);
        if ((!mainSame || !checklistSame) && saveDisabled) {
            setSaveDisabled(false);
        } else if (mainSame && checklistSame && !saveDisabled) {
            setSaveDisabled(true);
        }
      }, [JSON.stringify(mainFields), JSON.stringify(checklistFields)]);

    const onSave = () => {
        async function saveFields() {
            const response = await apiPutFields(new Fields(mainFields,checklistFields), session.session);
            if (response) {
              console.log('Fields Response',response)
            }
          }
          saveFields();
    }

    const onAddField = (newField:Field):boolean => {
        const fieldError = (newField.type === 'Checklist') ? newField.ValidityCheck(fieldsConfig.fields.checklistFields) : newField.ValidityCheck(fieldsConfig.fields.mainFields);
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
            <div className="cont-horiz baseline mrgn-btm">
                <h3>Item Configuration</h3>
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
            <div className="cont-horiz sa">
                <FieldsConfigurationForm updateType="Main" showSize={true} title={fieldTitle} description={fieldDesc} fields={mainFields} onUpdateFields={onUpdateFields}/>
                <FieldsConfigurationForm updateType="Checklist" showSize={false} title={checklistTitle} description={checklistDesc} fields={checklistFields} onUpdateFields={onUpdateFields}/>
            </div>
        </div>
    )
}

const fieldTitle = 'Fields Configuration';
const fieldDesc = 'These fields present on the item.';

const checklistTitle = 'Checklist Configuration';
const checklistDesc = 'This should describe fields';

export { ItemConfigurationForm }