import { Phases } from "../data classes/Phases"
import { Session } from "../data classes/Session"
import { putRequest } from "../general_Functions/api_Functions"

export { apiPutPhases, apiGetPhases, apiPostPhases }

async function apiPutPhases(phases:Phases, session:Session) {
    return await putRequest(phases,model,session,true,false).then(data => {return data })
}

async function apiGetPhases (session:Session) {
    return await putRequest(undefined,model,session,true,true).then(data => {
            return new Phases(data.phaseList);
    })
}

const apiPostPhases = () => {

}

const model = 'Phases'