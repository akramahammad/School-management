import React from 'react'
import classes from './Button.module.scss'
import {Button} from 'antd'
import PopupComp from '../Popup/Popup'


const ButtonComp=({type})=>{

        const [state,setState]=React.useState({
            displayPopup:false
        })

        const handleClick =()=>{
            setState({displayPopup:true})
        }

        const handleClose=()=>{
            setState({displayPopup:false})
        }

    return(
    <div>
        <Button className={classes.Button} onClick={handleClick}>Add</Button>
        <PopupComp fields={type==="Student"?
        [{label:"Roll No",type:"number",name:"rollNo",min:1},{label:"Name",type:"text",name:"name"}]
        :
        [{label:"Subject",type:"text",name:"subject"}]} type={type} display={state.displayPopup} handleClose={handleClose}/>
    </div>
    )
}

export default ButtonComp;