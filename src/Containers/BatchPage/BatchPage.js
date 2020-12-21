import React,{useContext} from 'react'
import classes from './BatchPage.module.scss'
import DropdownComp from '../../Components/Dropdown/Dropdown'
import { StoreContext} from '../../Context/store';
import { Input, InputNumber } from 'antd';

const BatchPage=()=>{
    const {state,dispatch}= useContext(StoreContext)
    const defaultState={
        ...state,   
        selectedBatch:null,
        displayStudentDropdown:false,
        student:[],
        selectedStudent:null,
        displaySubjectDropdown:false,
        selectedSubject:null,
        displayMarksInput:false,
        mark:null
    }

    const [localState,setState]= React.useState({...defaultState})

    const handleBatchChange =(val)=>{
        if(state.batchData[val]!==undefined){
            setState({...localState,student:[...state.batchData[val].students],selectedBatch:val,displayStudentDropdown:true,selectedSubject:null,selectedStudent:null,displaySubjectDropdown:false,displayMarksInput:false})
        }
        else{
            setState({...localState,selectedBatch:val,displayStudentDropdown:true,selectedSubject:null,selectedStudent:null,displaySubjectDropdown:false,
                displayMarksInput:false})
        }
        dispatch({
            type:"SELECT_BATCH",
            value:val
        })

}
    const handleStudentChange = (val)=>{
        setState({...localState,selectedStudent:val,displaySubjectDropdown:true,selectedSubject:null,displayMarksInput:false,mark:null})
        dispatch({
            type:"SELECT_STUDENT",
            value:val
        })
    }

    const handleSubjectChange =(val)=>{
        let position=-1;
        state.batchData[localState.selectedBatch].students.forEach((studentData,pos) =>{
            if(`${studentData.rollNo} - ${studentData.name}`===localState.selectedStudent){
                position=pos;
            }
        })
        
        if(state.batchData[localState.selectedBatch].students[position].marks[val]!==undefined){
            setState({...localState,selectedSubject:val,displayMarksInput:true,mark:localState.student[position].marks[val]})
        }
        else{
            setState({...localState,selectedSubject:val,displayMarksInput:true,mark:null})
        }
    }

    const handleMarksChange=(val)=>{
        setState({...localState,mark:val})
    }

    const handleMarksSave=(e)=>{
        e.preventDefault();
        if(localState.selectedSubject!==null && localState.selectedStudent!==null && localState.selectedBatch!==null && localState.mark!==null){
            let position=-1;
            state.batchData[localState.selectedBatch].students.forEach((studentData,pos) =>{
            if(`${studentData.rollNo} - ${studentData.name}`===localState.selectedStudent){
                position=pos;
            }
            })

            const updatedState={...state}
            updatedState.batchData[localState.selectedBatch].students[position].marks[localState.selectedSubject]=localState.mark
        
            dispatch({
                type:"SAVE_MARKS",
                value:updatedState
            })
            alert("Details Saved Successfully")
        }
        else{
            alert("Please enter all the details")
        }
    }

    const handleReset=()=>{
        setState({...defaultState})
    }

    return(
        <div>
            <main className={classes.Main}>
                <h1>Enter Student Details</h1>
                <div>
                    <form className={classes.Form}>
                    <div>
                    <DropdownComp type="Batch" display={true} options={localState.batch} handleChange={handleBatchChange}/>
                    <DropdownComp type="Student" display={localState.displayStudentDropdown} button="true" options={localState.selectedBatch!==null?state.batchData[localState.selectedBatch]!==undefined?state.batchData[localState.selectedBatch].students.map(studentData=> `${studentData.rollNo} - ${studentData.name}`):null:null} handleChange={handleStudentChange}/>
                    <DropdownComp type="Subject" display={localState.displaySubjectDropdown} button="true" options={state.subject} handleChange={handleSubjectChange} />
                    <div className={localState.displayMarksInput===true?null:classes.None}>
                    <p>Marks</p>
                    <InputNumber min={0} max={100} value={localState.mark} className={localState.displayMarksInput===true?classes.InputNumber:classes.None} onChange={handleMarksChange} />
                    </div>
                    </div>
                        <Input type="submit" value ="Save" className={localState.displayMarksInput===true?classes.Button:classes.None} onClick={handleMarksSave} />
                        <Input type="reset" value="Reset" className={localState.displayMarksInput===true?classes.Button:classes.None} onClick={handleReset}/>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default BatchPage;