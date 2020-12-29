import { InitialConfigurationType } from "../contexts/configuration-context"
import { Phases } from "../data classes/Phases"

const configReducer = (state:InitialConfigurationType,action:configutaionAction): InitialConfigurationType => {
    switch (action.type) {
        case 'State':
            return {
                ...state
            }
        }
        return state
}
type configutaionAction = {
    type: string,
    phases:Phases
}



export { configReducer } 