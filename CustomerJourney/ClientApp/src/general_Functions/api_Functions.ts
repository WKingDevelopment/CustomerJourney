import { apiConstants } from "../constants/api-Constants";
import { Session } from "../data classes/Session";
import { isEmptyOrSpace } from "./validations_Functions";

const postRequest = async (data:any, model:string, session:Session) => {
    const response = await fetch(`${apiConstants.urls.urlbase}/api/${model}}`, {
      method: apiConstants.methods.post,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({...data,...session})
    });
    return response.json();
  };

const putRequest = async (data:any, model:string, session:Session, getReq:boolean = false, useId:boolean = false) => {
  let url: string = getReq ? `${apiConstants.urls.urlbase}/api/${model}/Get` : `${apiConstants.urls.urlbase}/api/${model}}`;
  if (useId) {url = `${url}/${session.companyId.toString()}`};
  const response = await fetch(url, {
      method: apiConstants.methods.put,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({...data,...session})
    });
    return response.json();
  };

  const getRequest = async (model:string, session:Session, id:string = '') => {
    const url: string = isEmptyOrSpace(id) ? `${apiConstants.urls.urlbase}/api/${model}}` : `${apiConstants.urls.urlbase}/api/${model}/${id}}`
    const response = await fetch(url , {
      method: apiConstants.methods.put,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(session)
    });
    return response.json();
  };
  export { postRequest, putRequest, getRequest }