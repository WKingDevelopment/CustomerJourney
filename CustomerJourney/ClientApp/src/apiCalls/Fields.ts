import { Field } from "../data classes/Field"
import { Fields } from "../data classes/Fields"
import { Session } from "../data classes/Session"
import { putRequest } from "../general_Functions/api_Functions"

export { apiPutFields, apiGetFields }

async function apiPutFields(fields:Fields, session:Session) {
    return await putRequest(fields,model,session,true,false).then(data => {return data })
}

async function apiGetFields (session:Session) {
    return await putRequest(undefined,model,session,true,true).then(data => {
            console.log(data.mainFields[0])
            const mainfields: Field = data.mainFields as Field
            console.log(mainfields, mainfields instanceof Field)
            return new Fields(data.mainFields as Field[],data.checklistFields as Field[]);
    })
}

const model = 'Fields'