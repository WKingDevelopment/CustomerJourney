import React from 'react';
import { Field } from '../../../../data classes/Field';
import { SortableFieldsList } from '../../../shared components/SortableFieldsList';

const FieldsConfigurationForm = (props:IFieldsConfigurationFormProps) => {

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
    fields: Field[]
}

export { FieldsConfigurationForm }