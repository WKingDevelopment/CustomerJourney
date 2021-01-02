import React, {useState} from 'react';
import Dropdown from 'react-dropdown';
import { constants } from '../../../../constants/constants'
import { Field } from '../../../../data classes/Field';

const AddNewFieldForm = (props:AddNewFieldProps) => {
    const [label, setLabel] = useState<string>('')
    const [type, setType] = useState<string>(constants.fieldTypes[0])
    const [mandatoryPhase, setMandatoryPhase] = useState<string>(props.phases[0])
    const [size, setSize] = useState<string>(constants.fieldSizes[0]);

    const onAddField = (newField: Field) => {
        if(props.onAddField(newField)) {
            setLabel('')
        }   
    }

    return (
        <div className="cont-left width-75">
            <input className="input-small" value={label} onChange={(e) => { setLabel(e.target.value) }} />
            <Dropdown className="dropdown" placeholderClassName="dropdown-placeholder" menuClassName="dropdown-menus sa" options={constants.fieldTypes} value={type} onChange={(e:any) => { setType(e.value) }} />
            {<Dropdown className="dropdown" placeholderClassName="dropdown-placeholder" menuClassName="dropdown-menus sa" options={constants.fieldSizes} value={size} onChange={(e:any) => {setSize(e.value)}}/>}
            {<Dropdown className="dropdown" placeholderClassName="dropdown-placeholder" menuClassName="dropdown-menus sa" options={props.phases} value={mandatoryPhase} onChange={(e:any) => { setMandatoryPhase(e.value) }} />}
            <button className="button-large" value='Add' onClick={() => {onAddField(new Field(label,mandatoryPhase,type,size))}}>Add</button>
        </div>
    )
}

interface AddNewFieldProps {
    phases: string[],
    onAddField: (newField: Field) => boolean
}

export { AddNewFieldForm }