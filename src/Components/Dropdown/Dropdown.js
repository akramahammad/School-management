import React from 'react'
import classes from './Dropdown.module.scss';
import {Select} from 'antd'
import ButtonComp from '../Button/Button'
const {Option}=Select

const DropdownComp=(props)=>{
 
    return(
        <div className={props.display?classes.Dropdown:classes.None}>
            <p>{props.type}</p>
    
            <Select className={classes.type} placeholder="Select" showSearch onSelect={props.handleChange}>
                {   
                    props.options!=undefined?props.options.map(option =>{
                        return <Option value={option}>{option}</Option>
                    })
                    :
                    null
                }        
            </Select>
            {
                props.button==="true"?
                <ButtonComp type={props.type}/>:null
            }
        </div>
    )
}

export default DropdownComp;