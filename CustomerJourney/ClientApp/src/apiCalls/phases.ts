import { Phases } from "../data classes/Phases"
import { Session } from "../data classes/Session"
import { getRequest, putRequest } from "../general_Functions/api_Functions"

export { apiPutPhases, apiGetPhases, apiPostPhases }

const apiPutPhases = (phases:Phases, session:Session) => {
    putRequest(phases,model,session)
}

async function apiGetPhases (session:Session) {
    return await putRequest(undefined,model,session,true,true).then(data => {
            return new Phases(data.phases);
    })
}

const apiPostPhases = () => {

}

const model = 'Phases'