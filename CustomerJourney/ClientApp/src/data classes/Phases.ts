import { isEmptyOrSpace } from "../general_Functions/validations_Functions";

export class Phases {
    constructor(public phaseList: string[] = []) {}

    //#region Public Methods & Functions
    public insertPhase = (phase:string):Phases => {
        let clone = new Phases(this.phaseList)
        this.addPhaseToList(phase,clone)
        return clone;
    }

    public setPhases = (phases:string[]):Phases => {
        const result = new Phases(phases)
        return result;
    }

    public checkNewPhase = (phase:string) => {
        if (isEmptyOrSpace(phase)) {
            return 'Label cannot be empty.'
        }
        if (this.phaseList.includes(phase)) {
            return `Phase ${phase} already exists in list.`
        }
        if (phase.includes('*')) {
            return `Phase includes invalid character.`
        }

        if (phase.length > 15) {
            return `Phase has too many characters.`
        }
        return undefined
    }

    public removePhaseByIndex = (index:number):Phases => {
        let list: string[] = []
        for (let i=0;i<this.phaseList.length;i++) {
            if (i !== index) {
                list = list.concat([this.phaseList[i]])
            }
        }
        return new Phases(list)
    }

    // Check if the first and last phases the immovable values
    public postOrderChangeChecks = (newPhases: string[]): boolean => {
        console.log('PostOrderChecks.', newPhases[0], newPhases[newPhases.length - 1])
        if ((newPhases[0] === 'Unphased') && (newPhases[newPhases.length-1] === 'Completed')) {
            return true;
        }
        return false;
    }
    //#endregion

    private addPhaseToList = (phase:string,phaseObj:Phases) => {
        let result:string[] = [];
        for (let i=0;i<phaseObj.phaseList.length;i++) {
            if (i === phaseObj.phaseList.length-1) {
                result = result.concat([phase])
            }
            result = result.concat([phaseObj.phaseList[i]])
        }
        phaseObj.phaseList = result;
    }
}

const disabledPhases = ['Unphased','Completed']

export { disabledPhases }