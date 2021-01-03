import { isEmptyOrSpace } from "../general_Functions/validations_Functions";

export { Field, fieldArrayRemoveByIndex }
class Field {
    constructor (public label: string, public mandatoryPhase: string, public type:string, public size:string) { }

    //#region Public Methods
    public ValidityCheck = (fields:Field[]):string => {
        let error = '';
        if(isEmptyOrSpace(this.label)) {
            error = 'Field label cannot be empty.';
        } else if(isEmptyOrSpace(this.type)) {
            error = 'Field type cannot be empty.';
        } else if(isEmptyOrSpace(this.size)) {
            error = 'Field size cannot be empty.';
        } else if(this.labelInList(fields)) {
            error = 'Field already exists';
        }
        return error 
    }
    //#endregion

    //#region Private Methods
    private labelInList = (list:Field[]):boolean => {
        let result = false;
        for (let i=0;i<list.length;i++) {
            if(list[i].label === this.label) {
                return true;
            };
        };
        return result;
    }
    //#endregion
}

const fieldArrayRemoveByIndex = (fields: Field[], index: number): Field[] => {
   const clone = fields;
   return clone.splice(index,1);;
}