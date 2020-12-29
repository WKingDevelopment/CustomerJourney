import { Fields } from "../data classes/Fields"
import { Session } from "../data classes/Session"
import { putRequest } from "../general_Functions/api_Functions"

export { apiPutFields, apiGetFields }

async function apiPutFields(phases:Fields, session:Session) {
    return await putRequest(phases,model,session,true,false).then(data => {return data })
}

async function apiGetFields (session:Session) {
    return await putRequest(undefined,model,session,true,true).then(data => {
            return new Fields(data.mainFields,data.checklistFields);
    })
}

const model = 'Fields'