import React, { useEffect } from 'react';
import { Field } from '../../../../data classes/Field';
import { SortableFieldsList } from '../../../shared components/SortableFieldsList';

const FieldsConfigurationForm = (props:IFieldsConfigurationFormProps) => {

    useEffect(() => {
        
    },[JSON.stringify(props.fields)])

    const onRemove = () => {

    }

    return (
        <div>
            <h2>
                Fields Configuration
            </h2>
            <SortableFieldsList list={props.fields} onRemove={onRemove}/>
        </div>
    )
}

interface IFieldsConfigurationFormProps {
    fields: Field[],
    onUpdateFields: (fields: Field[], type:string) => void
}

export { FieldsConfigurationForm }