import React, { useContext, useEffect, useState } from "react";
import { arrayMove } from "react-sortable-hoc";
import { apiGetPhases, apiPutPhases } from "../../../../apiCalls/phases";
import { constants } from "../../../../constants/constants";
import { ConfigurationContext } from "../../../../contexts/configuration-context";
import { SessionContext } from "../../../../contexts/session-context";
import { Phases } from "../../../../data classes/Phases";
import { arrayComparer } from "../../../../general_Functions/array_Functions";
import { SortableList } from "../../../shared components/SortableList";

const PhasesConfigurationForm = () => {
  const { session, sessionDispatch } = useContext(SessionContext);
  const { config, configDispatch } = useContext(ConfigurationContext);

  const [newPhaseLabel, setNewPhaseLabel] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [phases, setPhases] = useState<Phases>(config.phases);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [savedPhases, setSavedPhases] = useState<Phases>(config.phases);

  console.log('PhaseConfig Page Config', config, phases)

  useEffect(() => {
    setPhases(config.phases)
  }, [JSON.stringify(config.phases)]);

  useEffect(() => {
    const same = arrayComparer(savedPhases.phaseList, phases.phaseList);
    if (!same && buttonDisabled) {
      setButtonDisabled(false);
    } else if (same && !buttonDisabled) {
      setButtonDisabled(true);
    }
  }, [JSON.stringify(phases.phaseList), JSON.stringify(savedPhases.phaseList)]);

  const onSortEnd = (props: ArrayMoveProps) => {
    if (props.oldIndex !== props.newIndex) {
      const newPhases = arrayMove(
        phases.phaseList,
        props.oldIndex,
        props.newIndex
      );
      if (phases.postOrderChangeChecks(newPhases)) {
        setPhases(phases.setPhases(newPhases));
      }
    }
  };

  const onSave = () => {
    async function savePhases() {
      const response = await apiPutPhases(phases, session.session);
      if (response) {
        setSavedPhases(phases);
      }
    }
    savePhases();
  };

  const addNewPhase = () => {
    setError("");
    const error = phases.checkNewPhase(newPhaseLabel);
    if (!error) {
      setPhases(phases.insertPhase(newPhaseLabel));
      setNewPhaseLabel("");
    } else {
      setError(error);
    }
  };

  const onRemove = (newList: string[]) => {
    setPhases(new Phases(newList));
  };

  return (
    <div>
      <div className="cont-horiz">
        <h2>Phase Configuration</h2>
        {
          <button disabled={buttonDisabled} onClick={onSave}>
            Save
          </button>
        }
      </div>
      <div className="cont-border">
          <h3>Add Phase</h3>
          <div className="cont-horiz sa">
          {error && <div className="input-Error">{error}</div>}
          <input
            type="text"
            placeholder="Add Phase"
            value={newPhaseLabel}
            onChange={(e) => setNewPhaseLabel(e.target.value)}
          />
          <button onClick={addNewPhase}>Add Phase</button>
        </div>
        <p>Drag and drop the phases below to suite your project's life-cycle</p>
        {phases && (
          <div className="small">
          <SortableList
            onRemove={onRemove}
            list={phases.phaseList}
            disabledList={constants.disabledPhases}
            onSortEnd={onSortEnd}
          />
          </div>
        )}
      </div>
    </div>
  );
};

interface ArrayMoveProps {
  newIndex: number;
  oldIndex: number;
}

export { PhasesConfigurationForm };
