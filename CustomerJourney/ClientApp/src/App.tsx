import React, { useReducer } from 'react';
import { Route } from 'react-router';
import { ConfigurationPage } from './components/pages/ConfigurationPage';
import { ConfigurationContext, InitialConfigurationType } from './contexts/configuration-context';
import { InitialSessionType, SessionContext } from './contexts/session-context';
import { Phases } from './data classes/Phases';
import { Session } from './data classes/Session';
import { configReducer } from './reducers/configuration-Reducer';
import { sessionReducer } from './reducers/session-Reducer';

import './styling/styles.scss'

export const App = () => {
  const initSession: InitialSessionType = { session: new Session() };
  const initConfig: InitialConfigurationType = { phases: new Phases };
  const [session, sessionDispatch] = useReducer(sessionReducer, initSession)
  const [config, configDispatch] = useReducer(configReducer, initConfig)

  return (
    <ConfigurationContext.Provider value={{config, configDispatch}}>
      <SessionContext.Provider value={{session, sessionDispatch}}>
        <Route exact path='/' component={ConfigurationPage} />
      </SessionContext.Provider>
    </ConfigurationContext.Provider>
  );
}
