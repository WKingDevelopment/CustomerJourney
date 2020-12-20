import React, { useReducer } from 'react';
import { Route } from 'react-router';
import { ConfigurationPage } from './components/pages/ConfigurationPage';
import { InitialSessionType, SessionContext } from './contexts/session-context';
import { Session } from './data classes/Session';
import { sessionReducer } from './reducers/session-Reducer';

import './styling/styles.scss'

export const App = () => {
  const initSession: InitialSessionType = { session: new Session() };
  const [session, dispatch] = useReducer(sessionReducer, initSession)

  return (
    <SessionContext.Provider value={{ session, dispatch }}>
      <Route exact path='/' component={ConfigurationPage} />
    </SessionContext.Provider>
  );
}
