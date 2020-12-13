import React from 'react'
import { Email } from '../data classes/Email'
import { User } from '../data classes/User'

export type InitialGeneralType = {
    user: User
  }

const initialState = {
    user: new User('','',new Email(''),-1,-1,-1)
}

const GeneralContext = React.createContext<
{
    general:InitialGeneralType,
    dispatch: React.Dispatch<any>;
}>
(
    {
        general:initialState,
        dispatch: () => null
    }
)

export { GeneralContext }


