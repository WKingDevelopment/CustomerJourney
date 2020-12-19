import React from 'react'
import { Session } from '../data classes/Session'

export type InitialSessionType = {
    session: Session
  }

const initialState: InitialSessionType = {
    session: new Session()
}

const SessionContext = React.createContext<
{
    session:InitialSessionType,
    dispatch: React.Dispatch<any>;
}>
(
    {
        session:initialState,
        dispatch: () => null
    }
)

export { SessionContext }
