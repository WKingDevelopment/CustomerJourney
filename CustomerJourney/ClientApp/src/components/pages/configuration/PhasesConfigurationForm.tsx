import React, { useContext, useEffect, useState } from 'react';
import { arrayMove } from 'react-sortable-hoc';
import { apiGetPhases, apiPutPhases } from '../../../apiCalls/phases';
import { SessionContext } from '../../../contexts/session-context';
import { disabledPhases, Phases } from '../../../data classes/Phases';
import { arrayComparer } from '../../../general_Functions/array_Functions';
import { SortableList } from '../../shared components/SortableList';

const PhasesConfigurationForm = () => {
    const [newPhaseLabel, setNewPhaseLabel] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [phases, setPhases] = useState<Phases>(new Phases(disabledPhases));
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
    const { session, dispatch } = useContext(SessionContext)
    const [savedPhases, setSavedPhases] = useState<Phases>(phases)
    
    useEffect(() => {
      async function getPhases() {
        const response = await apiGetPhases(session.session)
        if (response != undefined) { 
          setPhases(response)
          setSavedPhases(response)
        }
      }
      getPhases()
    }, [])

  useEffect(() => {
    const same = arrayComparer(savedPhases.phaseList,phases.phaseList)
    if (!same && buttonDisabled) {
      setButtonDisabled(false)
    } else if (same && !buttonDisabled) {
      setButtonDisabled(true)
    } 
  },[JSON.stringify(phases.phaseList),JSON.stringify(savedPhases.phaseList)])

    const onSortEnd = (props: ArrayMoveProps) => {
      console.log('positions old new',props.oldIndex, props.newIndex)
    if (props.oldIndex !== props.newIndex) {
        const newPhases = arrayMove(phases.phaseList, props.oldIndex, props.newIndex)
        console.log('Phase list.', newPhases)
        if (phases.postOrderChangeChecks(newPhases)) {
            console.log('Passed post order checks.')
            setPhases(phases.setPhases(newPhases))
        }
    }
};

  const onSave = () => {
    async function savePhases() {
      const response = await apiPutPhases(phases,session.session)
      if (response) {
        setSavedPhases(phases);
      }
    }
    savePhases()
  }

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
          <h1>Phase Configuration</h1>
          {<button disabled={buttonDisabled} onClick={onSave}>Save</button>}
          <h2>Add Phase</h2>
          {error && <div className="input-Error">{error}</div>}
          <input
            type="text"
            placeholder="Add Phase"
            value={newPhaseLabel}
            onChange={(e) => setNewPhaseLabel(e.target.value)}
          />
          <button onClick={addNewPhase}>Add Phase</button>
          <p>Drag and drop the phases below to suite your project's life-cycle</p>
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