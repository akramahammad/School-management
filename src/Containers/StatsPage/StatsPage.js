import { Button} from 'antd'
import React,{useContext} from 'react'
import DropdownComp from '../../Components/Dropdown/Dropdown'
import { StoreContext } from '../../Context/store'
import ApexChart from 'react-apexcharts'
import classes from './StatsPage.module.scss'

const StatsPage=()=>{

    const {state}=useContext(StoreContext)
    const initialState={
        ...state,
        displayBatchDropdown:false,
        selectedBatch:null,
        displayStudentDropdown:false,
        student:[],
        selectedStudent:null,
        displaySubjectDropdown:false,
        selectedSubject:null,
        displayStatsDropdown:false,
        stats:null,
        displayButtons:false,
        displayGraph:false,
        pieChart:null,
        barChart:null
    }

    const [localState,setState]=React.useState({...initialState})

      

    const handleClassifier=(val)=>{
            setState({...localState,displayBatchDropdown:true,classifier:val,displayStudentDropdown:false,displaySubjectDropdown:false,displayStatsDropdown:false,displayGraph:false})
            
    }

    const handleBatchChange =(val)=>{
        if(localState.classifier==="Subject"){
            setState({...localState,displaySubjectDropdown:true,displayStudentDropdown:false,selectedBatch:val,displayStatsDropdown:false,displayGraph:false,displayButtons:false})
        }
        else{
            const studentData=localState.batchData[val]!==undefined?localState.batchData[val].students!==undefined?localState.batchData[val].students:[]:[]
            setState({...localState,displayStudentDropdown:true,displaySubjectDropdown:false,selectedBatch:val,student:studentData,displayStatsDropdown:false,displayGraph:false,selectedStudent:null,displayButtons:false})
        }
    }

    const handleStudentChange =(val)=>{
        setState({...localState,selectedStudent:val,stats:"Total Marks",displayGraph:false,displayButtons:true})
    }

    const handleSubjectChange =(val)=>{
        setState({...localState,displayStatsDropdown:true,selectedSubject:val,displayButtons:false})
        
    }

    const handleStatsChange=(val)=>{
        setState({...localState,stats:val,displayGraph:false,displayButtons:true})
    }


    const handleSubmit=()=>{

        const message="Please enter all the details"
        if(localState.classifier==="Subject"){
            if(!(localState.selectedSubject!==null && localState.stats!==null && localState.selectedBatch!==null)){
                alert(message)
                return 0;
            }
        }
        if(localState.classifier==="Student"){
            if(!(localState.selectedStudent!==null && localState.stats!==null && localState.selectedBatch!==null)){
                alert(message)
                return 0;
            }
        }
        //Class Average
        switch(localState.stats){
            case "Class Average":

                if(localState.batchData[localState.selectedBatch]===undefined){
                    alert("No student found in this batch")
                    return 0;
                }
                else if(localState.batchData[localState.selectedBatch].students.every(student => student.marks[localState.selectedSubject]===undefined)){
                        alert("No mark details available for any students in this batch")
                        return 0;
                    }

                const classMarks=localState.batchData[localState.selectedBatch].students.filter(student => student.marks[localState.selectedSubject]!==undefined).map(student => student.marks[localState.selectedSubject])
                let total=0;
                let count=0;
                classMarks.forEach(mark => {
                    total+=parseFloat(mark)
                    count++;
                })
                
                setState({...localState,
                    displayGraph:true,
                    barChart:null,
                    pieChart:{
                        series: [parseFloat(total/count),100-parseFloat(total/count)],
                        options: {
                          chart: {
                            type: 'donut',
                          },
                          labels:["Average Marks","Rest"],
                          responsive: [{
                            breakpoint: 480,
                            options: {
                              chart: {
                                width: 200
                              },
                              legend: {
                                position: 'bottom'
                              }
                            }
                          }]
                        },
          
                    }
                })
                break;

            //Top 3 Scorers
            case"Top 3 Scorers":

            const SubjectScores=[];
            localState.batchData[localState.selectedBatch].students.forEach(student=>{ 
                SubjectScores.push({rollNo:student.rollNo,name:student.name,mark:student.marks[localState.selectedSubject]})
            })
            const updatedSubjectScores=SubjectScores.filter(student => student.mark!==undefined)
            const top3Scores=updatedSubjectScores.sort((a,b)=> b.mark-a.mark).slice(0,3)
            console.log(top3Scores)
            if(top3Scores.length!==0){
            setState({
                ...localState,
                displayGraph:true,
                pieChart:null,
                barChart:{
                    options: {
                    chart: {
                      id: "basic-bar"
                    },
                    xaxis: {
                      categories: top3Scores.map(student => `${student.rollNo}:${student.name}`)
                    }
                  },
                  series: [
                    {
                      name: "Marks",
                      data: top3Scores.map(student => student.mark)
                    }
                  ]
                }  
            })
            }
            else{
                alert("No mark details available for this subject in this batch")
                        
            }
                break;
        //Total Student Marks
            case "Total Marks":
                let position=-1;
                state.batchData[localState.selectedBatch].students.forEach((studentData,pos) =>{
                if(`${studentData.rollNo} - ${studentData.name}`===localState.selectedStudent){
                position=pos;
                    }
                })
                let TotalMarks=[];
                localState.subject.forEach(subject =>{
                    if(state.batchData[localState.selectedBatch].students[position].marks[subject]!==undefined){
                    TotalMarks.push({
                        subject:subject,
                        mark:state.batchData[localState.selectedBatch].students[position].marks[subject]
                    })
                }
                })

                
                if(TotalMarks.length!==0){
                    setState({
                        ...localState,
                        displayGraph:true,
                        pieChart:null,
                        barChart:{
                            options: {
                                chart: {
                                  id: "basic-bar2"
                                },
                                xaxis: {
                                  categories: TotalMarks.map(student => student.subject)
                                }
                              },
                              series: [
                                {
                                  name: "Names",
                                  data: TotalMarks.map(student => student.mark)
                                }
                              ]
                        }
                    })
                }
                else{
                    alert("No marks found for any subject")
                }
                break;

                default:
                    break;

            }

    } 

    const handleReset=()=>{
        setState({
            ...initialState
        })
    }

    return(
        <div>
            <main className={classes.Main}>
                <h1>Statistics</h1>
                <div>
                    <form className={classes.Form}>
                        <div>
                        <DropdownComp display ="true" type="Classifier" options={["Student","Subject"]} handleChange={handleClassifier}/>
                        <DropdownComp type="Batch" display ={localState.displayBatchDropdown} options={localState.batch} handleChange={handleBatchChange}/>
                        <DropdownComp type="Subject" display ={localState.displaySubjectDropdown} options={localState.subject} handleChange={handleSubjectChange}/>
                        <DropdownComp type="Stats" display ={localState.displayStatsDropdown} options={["Class Average","Top 3 Scorers"]} handleChange={handleStatsChange}/>
                        <DropdownComp type="Student" display ={localState.displayStudentDropdown} options={localState.student.map(student => `${student.rollNo} - ${student.name}`)} handleChange={handleStudentChange}/>
                        </div>
                        <Button className={localState.displayButtons?classes.Button:classes.None} onClick={handleSubmit}>View</Button>
                        <Button className={localState.displayButtons?classes.Button:classes.None} onClick ={handleReset}>Reset</Button>
                    </form>
                </div>


                <section className={localState.displayGraph?classes.GraphSection:classes.None}>
                    <div>
                        <h2>{localState.stats}</h2>
                        {
                            localState.pieChart!==null?
                            <ApexChart
                                options={localState.pieChart.options}
                                series={localState.pieChart.series}
                                type="donut"
                                width="500px"
                            />:null
                        }
                        {
                            localState.barChart!==null?
                            <ApexChart
                                options={localState.barChart.options}
                                series={localState.barChart.series}
                                type="bar"
                                width="500px"
                            />:null

                        }

                        {

                            localState.classifier==="Subject"?
                            <h2>{`Batch ${localState.selectedBatch} - ${localState.selectedSubject}`}</h2>:
                            <div>
                                <h2>{`${localState.selectedStudent}`}</h2>
                                <h2>{`Batch ${localState.selectedBatch}`}</h2>
                            </div>
                        }
                    
                    </div>
                </section>
            </main>
        </div>
    )
}
export default StatsPage;