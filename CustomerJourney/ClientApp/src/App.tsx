import React, { useEffect, useReducer } from 'react';
import { Route } from 'react-router';
import { apiGetFields } from './apiCalls/Fields';
import { apiGetPhases } from './apiCalls/phases';
import { ConfigurationPage } from './components/pages/ConfigurationPage';
import { reducerConstants } from './constants/reducer-Constants';
import { FieldsContext, InitialFieldsType } from './contexts/fields-context';
import { InitialPhasesType, PhasesContext } from './contexts/phases-context';
import { InitialSessionType, SessionContext } from './contexts/session-context';
import { Fields } from './data classes/Fields';
import { Phases } from './data classes/Phases';
import { Session } from './data classes/Session';
import { fieldsReducer } from './reducers/fields-Reducer';
import { phasesReducer } from './reducers/phases-Reducer';
import { sessionReducer } from './reducers/session-Reducer';

import './styling/styles.scss'

export const App = () => {
  const initSession: InitialSessionType = { session: new Session() };
  const initPhases: InitialPhasesType = { phases: new Phases() };
  const initFields: InitialFieldsType = { fields: new Fields() };
  const [session, sessionDispatch] = useReducer(sessionReducer, initSession)
  const [phasesConfig, phasesDispatch] = useReducer(phasesReducer, initPhases)
  const [fieldsConfig, fieldsDispatch] = useReducer(fieldsReducer, initFields)

  useEffect(() => {
        async function getPhases() {
          const fields:Fields = await apiGetFields(session.session)
          const phases:Phases = await apiGetPhases(session.session);
          if (phases !== undefined && fields !== undefined) {
            phasesDispatch({type:reducerConstants.setPhases,phases:phases});
            fieldsDispatch({type:reducerConstants.setFields,fields:fields})
          }
        }
        getPhases();
      }, []);

  return (
    <PhasesContext.Provider value={{phasesConfig, phasesDispatch}}>
      <SessionContext.Provider value={{session, sessionDispatch}}>
        <FieldsContext.Provider value={{fieldsConfig, fieldsDispatch}}>
          <Route exact path='/' component={ConfigurationPage} />
        </FieldsContext.Provider>
      </SessionContext.Provider>
    </PhasesContext.Provider>
  );
}
