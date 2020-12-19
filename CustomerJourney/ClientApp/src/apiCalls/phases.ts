import { Phases } from "../data classes/Phases"
import { Session } from "../data classes/Session"
import { getRequest, putRequest } from "../general_Functions/api_Functions"

export { apiPutPhases, apiGetPhases, apiPostPhases }

async function apiPutPhases(phases:Phases, session:Session) {
    return await putRequest(phases,model,session,true,false).then(data => {return data })
}

async function apiGetPhases (session:Session) {
    return await putRequest(undefined,model,session,true,true).then(data => {
            const a = new Phases(data.phaseList);
            return a
    })
}

const apiPostPhases = () => {

}

const model = 'Phases'