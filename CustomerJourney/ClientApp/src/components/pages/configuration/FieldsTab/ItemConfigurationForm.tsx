import React, { useState } from 'react';
import { ChecklistConfigurationForm } from './ChecklistConfigurationForm';
import { FieldsConfigurationForm } from './FieldsConfigurationForm';

const ItemConfigurationForm = () => {
    const [saveDisabled, setSaveDisabled] = useState<boolean>(true)

    // useEffect(() => {
    //     async function getPhases() {
    //       const response = await apiGetPhases(session.session);
    //       if (response != undefined) {
    //         setPhases(response);
    //         setSavedPhases(response);
    //       }
    //     }
    //     getPhases();
    //   }, []);

    const onSave = () => {

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
                <FieldsConfigurationForm/>
                <ChecklistConfigurationForm/>
            </div>
        </div>
    )
}

export { ItemConfigurationForm }