import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { Field } from "../../data classes/Field";

const SortableFieldsList = React.memo(
  SortableContainer((props: ISortableListProps) => {
    let key: number = -1;

    return (
      <table className="mrgn-btm">
        <tbody>
          <tr>
            <th>Label</th>
            <th>Type</th>
            {props.showSize && <th>Size</th>}
            <th>Summary</th>
            <th>Mandatory Phase</th>
            <th/>
          </tr>
          {props.list.map((field) => {
            key += 1;
            return (
              <SortableItem
                key={key}
                index={key}
                id={key}
                showSize={props.showSize}
                onRemove={props.onRemove}
                field={field}
              />
            );
          })}
        </tbody>
      </table>
    );
  })
);

const SortableItem = SortableElement((props: ISortableItemProps) => {
  return (
    <tr className="grabbing" key={props.id}>
        <td className="noselect">{props.field.label}</td>
        <td className="noselect">{props.field.type}</td>
        {props.showSize && <td className="noselect">{props.field.size}</td>}
        <td className="noselect">{props.field.mandatoryPhase}</td>
        <td className={props.field.summary? "noselect button-Y" : "noselect button-X"}>{props.field.summary? 'Yes' : 'No'}</td>
        <td className="noselect">
          <button
            className="button-X"
            onClick={() => {
              props.onRemove(props.id);
            }}
          >
            X
          </button>
        </td>
    </tr>
  );
});

interface ISortableListProps {
  list: Field[];
  showSize: boolean;
  onRemove: (index: number) => void;
}

interface ISortableItemProps {
  field: Field;
  id: number;
  showSize: boolean;
  onRemove: (id: number) => void;
}

export interface ArrayMoveProps {
  newIndex: number;
  oldIndex: number;
}

export { SortableFieldsList };
