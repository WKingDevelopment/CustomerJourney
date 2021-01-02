import React, { useEffect } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { Field } from "../../data classes/Field";

const SortableFieldsList = React.memo(
  SortableContainer((props: ISortableListProps) => {
    let key: number = -1;
    const onRemove = (id: number): void => {
      props.onRemove([]);
    };

    useEffect(() => {},[JSON.stringify(props.list)])

    return (
      <table>
        <tbody>
          <tr>
            <th>Label</th>
            <th>Type</th>
            <th>Size</th>
            <th>Mandatory Phase</th>
          </tr>
          {props.list.map((field) => {
            key += 1;
            return (
              <SortableItem
                key={key}
                index={key}
                id={key}
                onRemove={onRemove}
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
    <tr key={props.id}>
      <td>{props.field.label}</td>
      <td>{props.field.type}</td>
      <td>{props.field.size}</td>
      <td>{props.field.mandatoryPhase}</td>
      <td>
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
  onRemove: (result: string[]) => void;
}

interface ISortableItemProps {
  field: Field;
  id: number;
  onRemove: (id: number) => void;
}

export { SortableFieldsList };
