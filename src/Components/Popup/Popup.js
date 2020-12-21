import React,{useContext} from 'react'
import classes from './Popup.module.scss'
import {Button, Input} from 'antd'
import { StoreContext } from '../../Context/store'

const PopupComp=(props)=>{

    const {state,dispatch}=useContext(StoreContext);
    const [form,setForm] = React.useState({});
    
     const handleClick=(e)=>{
        e.preventDefault();
        let filled =true;
        for( let i in form){   
            if((form[i].length<=0)){
                filled =false;
                break;
            }
        }
        if(Object.keys(form).length!==props.fields.length){
            filled=false;
        }
        
        if(filled){
            switch (props.type) {
                case "Student":
                    let duplicateStudent=false;
                    if(state.batchData[state.selectedBatch]!==undefined){
                    let existingStudentsRollNo=state.batchData[state.selectedBatch].students.map(student => student.rollNo)
                    existingStudentsRollNo.forEach(rollNo =>{
                        if(rollNo==form.rollNo){
                            duplicateStudent=true    
                        }
                        
                    })
                }
                    if(duplicateStudent){
                        alert("Roll number already present")
                    }
                    else{
                        dispatch({
                            type:"ADD_STUDENT",
                            rollNo:Number(form.rollNo),
                            name:form.name
                        })
                        form.rollNo="";
                        form.name="";
                        props.handleClose();
                        alert("Student added successfully")
                    }
                    
                    break;
                case "Subject":
                    let duplicateSubject=false;
                    state.subject.forEach(subject =>{
                        if(subject.toLowerCase()===form.subject.toLowerCase()){
                            duplicateSubject=true
                            
                        }
                    })
                    if(duplicateSubject){
                        alert("Subject already present")
                    }
                    else{
                        dispatch({
                            type:"ADD_SUBJECT",
                            subject:form.subject
                        })
                        form.subject=""
                        props.handleClose();
                        alert("Subject added successfully")
                    }
                    
                    break;
                default:
                    break;
            }
        }
        else{
            alert("Please enter all the details")
        }

    }

    const handleInput =(e)=>{
        console.log(e.target.name + e.target.value)
        setForm({...form,[e.target.name]:e.target.value})
    }
    return(
    <div>
    <main className={props.display?classes.Main:classes.None}>
            <form className={classes.Form}>
            
            <h2>{`Add ${props.type}`}</h2>
            {
                props.fields.map(field =>{
                    return (
                    <div>
                         <p>{field.label}</p>
                         <Input type={field.type} id ={`${field.name}field`} name={field.name} min={field.min} value={form[field.name]!==undefined?form[field.name]:null} onChange={handleInput} required/>
                    </div>
                    )
                })
            }
                <Button htmlType="submit" onClick={handleClick}>Add</Button>
                <Button onClick={props.handleClose}>Close</Button>
            </form>
        </main>

    </div>
    )
}


export default PopupComp;