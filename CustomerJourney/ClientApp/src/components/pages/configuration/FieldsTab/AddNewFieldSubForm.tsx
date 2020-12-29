import React, {useState} from 'react';
import Dropdown from 'react-dropdown';
import { constants } from '../../../../constants/constants'
import { Field } from '../../../../data classes/Field';

const AddNewField = (props:AddNewFieldProps) => {
    const [label, setLabel] = useState<string>('')
    const [type, setType] = useState<string>(constants.fieldTypes[0])
    const [mandatoryPhase, setMandatoryPhase] = useState<string>(props.phases[0])
    const [size, setSize] = useState<string>(constants.fieldSizes[0]);

    return (
        <div>
            <input value={label} onChange={(e) => { setLabel(e.target.value) }} />
            <Dropdown options={constants.fieldTypes} value={type} onChange={(e:any) => { setType(e.value) }} />
            {<Dropdown options={constants.fieldSizes} value={size} onChange={(e:any) => {setSize(e.value)}}/>}
            {<Dropdown options={props.phases} value={mandatoryPhase} onChange={(e:any) => { setMandatoryPhase(e.value) }} />}
            <button value='Add' onClick={() => {props.onAddField(new Field(label,mandatoryPhase,type,size))}}>Add</button>
        </div>
    )
}

interface AddNewFieldProps {
    phases: string[],
    onAddField: (field:Field) => void
}

export { AddNewField }