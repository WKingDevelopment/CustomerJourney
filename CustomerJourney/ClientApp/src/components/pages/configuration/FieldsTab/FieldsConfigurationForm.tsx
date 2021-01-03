import React, { useEffect } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import { Field, fieldArrayRemoveByIndex } from '../../../../data classes/Field';
import { ArrayMoveProps, SortableFieldsList } from '../../../shared components/SortableFieldsList';

const FieldsConfigurationForm = (props:IFieldsConfigurationFormProps) => {

    const onRemove = (index: number) => {
        props.onUpdateFields(fieldArrayRemoveByIndex(props.fields,index), updateType);
    }

    const onSortEnd = (moveProps: ArrayMoveProps) => {
        if (moveProps.oldIndex !== moveProps.newIndex) {
          const newFields = arrayMove(
            props.fields,
            moveProps.oldIndex,
            moveProps.newIndex
          );
            props.onUpdateFields(newFields, updateType)
        }
      };

    return (
        <div>
            <h2>
                Fields Configuration
            </h2>
            <div className="cont-border">
                <SortableFieldsList onSortEnd={onSortEnd} list={props.fields} onRemove={onRemove}/>
            </div>
        </div>
    )
}

interface IFieldsConfigurationFormProps {
    fields: Field[],
    onUpdateFields: (fields: Field[], type:string) => void
}

const updateType = 'Main'

export { FieldsConfigurationForm }