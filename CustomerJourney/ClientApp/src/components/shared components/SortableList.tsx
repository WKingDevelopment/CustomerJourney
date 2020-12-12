import React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { removeFromArrayByIndex } from '../../general_Functions/arrayFunctions';

const SortableList = React.memo(SortableContainer((props:ISortableListProps) => {
    let key: number = -1

    const onRemove = (id:number):void => {
      console.log(id)
      props.onRemove(removeFromArrayByIndex(id,props.list))
    }

    return (
      <ul>
        {props.list.map((label) => {
          const disabled = props.disabledList && props.disabledList.includes(label);
          key += 1;
         return (
            <SortableItem key={key} index={key} id={key} onRemove={onRemove} label={label} disabled={disabled} showRemove={!disabled}/>
        )})}
      </ul>
    );
  }));

  const SortableItem = SortableElement((props:ISortableItemProps) => {
    return (
    <div>
      {props.showRemove && <button onClick={() => {props.onRemove(props.id)}}>X</button>}
    <li>{props.label}</li>
      </div>
    )});

interface ISortableListProps {
    list:string[],
    disabledList?: string[],
    onRemove: (result:string[]) => void
}

interface ISortableItemProps {
    label: string,
    showRemove: boolean,
    id: number,
    onRemove: (id:number) => void
}

  export { SortableList }