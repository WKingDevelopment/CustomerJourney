import React, { useEffect, useState } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import { disabledPhases, Phases } from '../../../data classes/Phases';
import { arrayComparer } from '../../../general_Functions/array_Functions';
import { SortableList } from '../../shared components/SortableList';

const PhasesConfigurationForm = () => {
    const [newPhaseLabel, setNewPhaseLabel] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [phases, setPhases] = useState<Phases>(new Phases(disabledPhases));
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
    
    
//   useEffect(() => {
//     const same = arrayComparer(phases.phaseList,props.phases.phaseList)
//     if (!same && buttonDisabled) {
//       setButtonDisabled(false)
//     } else if (same && !buttonDisabled) {
//       setButtonDisabled(true)
//     } 
//   },[JSON.stringify(phases.phaseList)])

  const onSortEnd = (props:ArrayMoveProps) => {
    if (props.oldIndex !== props.newIndex) {
      const newPhases = arrayMove(phases.phaseList,props.oldIndex,props.newIndex)
      if (phases.postOrderChangeChecks(newPhases)) { setPhases(phases.setPhases(newPhases))}
    }
};

  const addNewPhase = () => {
    setError('')
    const error = phases.checkNewPhase(newPhaseLabel);
    if (!error) {
      setPhases(phases.insertPhase(newPhaseLabel))
      setNewPhaseLabel('')
    } else {
      setError(error)
    }
  }

  const onRemove = (newList:string[]) => {
    setPhases(new Phases(newList))
  }

    return (
        <div>
          <h1>Phases</h1>
          {<button disabled={buttonDisabled}>Save</button>}
          <h2>Add Phase</h2>
          <div>{error}</div>
          <input
            type="text"
            placeholder="Add Phase"
            value={newPhaseLabel}
            onChange={(e) => setNewPhaseLabel(e.target.value)}
          />
          <button onClick={addNewPhase}>Add Phase</button>
          <p>Drag and drop the phases below to suite your project's process</p>
          {phases && (
            <SortableList
              onRemove={onRemove}
              list={phases.phaseList}
              disabledList={disabledPhases}
              onSortEnd={onSortEnd}
            />
          )}
        </div>
      );
}

interface IPhasesConfigurationFormProps {
    phases:Phases,
}

interface ArrayMoveProps {
  newIndex:number, 
  oldIndex:number
}

export { PhasesConfigurationForm }