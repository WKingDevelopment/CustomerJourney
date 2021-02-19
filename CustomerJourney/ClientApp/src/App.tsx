import React, { useEffect, useReducer } from 'react';
import { apiGetFields } from './apiCalls/Fields';
import { apiGetPhases } from './apiCalls/phases'; 
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
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './styling/styles.scss'
import { LifeCyclePage } from './components/pages/LifeCyclePage';
import { ConfigurationPage } from './components/pages/ConfigurationPage';

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
            console.log(fields)
            phasesDispatch({type:reducerConstants.setPhases,phases:phases});
            fieldsDispatch({type:reducerConstants.setFields,fields:fields})
          }
        }
        getPhases();
      }, []);

  return (
    <Router>
      <Switch>
      <PhasesContext.Provider value={{phasesConfig, phasesDispatch}}>
      <SessionContext.Provider value={{session, sessionDispatch}}>
        <FieldsContext.Provider value={{fieldsConfig, fieldsDispatch}}>
          <Route exact path='/' component={LifeCyclePage} />
          <Route exact path='/Configuration' component={ConfigurationPage}/>
        </FieldsContext.Provider>
      </SessionContext.Provider>
    </PhasesContext.Provider>
      </Switch>
    </Router>
  );
}
