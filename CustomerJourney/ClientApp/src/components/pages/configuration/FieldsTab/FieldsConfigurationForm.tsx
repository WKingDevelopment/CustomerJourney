import React, { useEffect } from "react";
import { arrayMove } from "react-sortable-hoc";
import { Field, fieldArrayRemoveByIndex } from "../../../../data classes/Field";
import {
  ArrayMoveProps,
  SortableFieldsList,
} from "../../../shared components/SortableFieldsList";

const FieldsConfigurationForm = (props: IFieldsConfigurationFormProps) => {
  const onRemove = (index: number) => {
    props.onUpdateFields(
      fieldArrayRemoveByIndex(props.fields, index),
      props.updateType
    );
  };

  const onSortEnd = (moveProps: ArrayMoveProps) => {
    if (moveProps.oldIndex !== moveProps.newIndex) {
      const newFields = arrayMove(
        props.fields,
        moveProps.oldIndex,
        moveProps.newIndex
      );
      props.onUpdateFields(newFields, props.updateType);
    }
  };

  return (
    <div className="cont-vert width-100">
        <h3>{props.title}</h3>
        <p>{props.description}</p>

        <div className="cont-border width-75">
          <SortableFieldsList
            showSize={props.showSize}
            onSortEnd={onSortEnd}
            list={props.fields}
            onRemove={onRemove}
          />
        </div>
      </div>
  );
};

interface IFieldsConfigurationFormProps {
  fields: Field[];
  title: string;
  description: string;
  showSize: boolean;
  updateType: string;
  onUpdateFields: (fields: Field[], type: string) => void;
}

export { FieldsConfigurationForm };
