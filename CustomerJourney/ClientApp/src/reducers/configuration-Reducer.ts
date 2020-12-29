import { reducerConstants } from "../constants/reducer-Constants"
import { InitialConfigurationType } from "../contexts/configuration-context"
import { Phases } from "../data classes/Phases"

const configReducer = (state:InitialConfigurationType,action:configutaionAction): InitialConfigurationType => {
    switch (action.type) {
        case reducerConstants.state:
            return {
                ...state
            }
        case reducerConstants.setPhases:
            console.log("Config Reducer Hit", action.phases)
            return {
                ...state,
                phases: action.phases
            }
        }
        return state
}
type configutaionAction = {
    type: string,
    phases:Phases
}



export { configReducer } 