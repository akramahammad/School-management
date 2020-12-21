import React, { createContext, useReducer } from 'react';

export const StoreContext = createContext();

const initialState={
    batchData:{
    "4": {
    "students": [
    {
    "rollNo": 1,
    "name": "Ali",
    "marks": {
    "Hindi": 88,
    "English": 98,
    "Maths": 97,
    "Science": 92,
    "Social": 85
    }
    },
    {
    "rollNo": 2,
    "name": "Amy",
    "marks": {
    "Hindi": 83,
    "English": 98,
    "Maths": 94,
    "Science": 92,
    "Social": 85
    }
    }
    ]
    },
    "5": {
    "students": [
    {
    "rollNo": 1,
    "name": "Bahu",
    "marks": {
    "Hindi": 88,
    "English": 98,
    "Maths": 97,
    "Science": 92,
    "Social": 85
    }
    },
    {
    "rollNo": 2,
    "name": "Badr",
    "marks": {
    "Hindi": 83,
    "English": 98,
    "Maths": 94,
    "Science": 92,
    "Social": 85
    }
    }
    ]
    },
    "6": {
    "students": [
    {
    "rollNo": 1,
    "name": "Carragher",
    "marks": {
    "Hindi": 88,
    "English": 98,
    "Maths": 97,
    "Science": 92,
    "Social": 85
    }
    },
    {
     "rollNo": 3,
     "name": "Carry",
     "marks": {
     "Hindi": 81,
     "English": 98,
     "Maths": 97,
     "Science": 92,
     "Social": 85
     }
     },  
     {
         "rollNo": 4,
         "name": "Dany",
         "marks": {
         "Hindi": 80,
         "English": 98,
         "Maths": 97,
         "Science": 92,
         "Social": 85
         }
         },
        {
    "rollNo": 5,
    "name": "Donald",
    "marks": {
    "Hindi": 70,
    "English": 98,
    "Maths": 97,
    "Science": 92,
    "Social": 85
    }
    },
    {
    "rollNo": 2,
    "name": "Cummins",
    "marks": {
    "Hindi": 83,
    "English": 98,
    "Maths": 94,
    "Science": 92,
    "Social": 85
    }
    }
    ]
    }
},
    batch:[4,5,6,7,8,9],
    subject:["English","Hindi","Maths","Science","Social"],
    
}

const reducer = (state=initialState, action) => {
  switch(action.type) {

    case "ADD_SUBJECT":
        return{
            ...state,
            subject:[...state.subject,action.subject]
        }

    case "ADD_STUDENT":
        const newStudent={
            rollNo:action.rollNo,
            name:action.name,
            marks:{}
        }
        state.batchData[state.selectedBatch]!=undefined?
        state.batchData[state.selectedBatch].students.push(newStudent):
        state.batchData[state.selectedBatch]={students:[{...newStudent}]}
        console.log({...state})
        return{
            ...state
        }
    
    case "SELECT_BATCH":
        return{
            ...state,
            selectedBatch:action.value
        }

    case "SELECT_STUDENT":
            return{
                ...state,
                selectedStudent:action.value
            }
    case "SAVE_MARKS":
        return action.value
        
    default:
        return {...state}
  }

}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  )
}
