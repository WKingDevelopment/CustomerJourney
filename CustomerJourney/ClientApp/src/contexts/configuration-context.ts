import React from 'react'
import { Phases } from '../data classes/Phases'

export type InitialConfigurationType = {
    phases: Phases
  }

const initialState = {
    phases: new Phases()
}

const ConfigurationContext = React.createContext<
{
    config:InitialConfigurationType,
    configDispatch: React.Dispatch<any>;
}>
(
    {
        config:initialState,
        configDispatch: () => null
    }
)

export { ConfigurationContext }


