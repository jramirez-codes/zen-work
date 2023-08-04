import React from "react";
import Checkbox from '@mui/material/Checkbox';
import { Input, Stack } from "@mui/material";
import TaskItem from "./components/taskItem";
import { useDispatch } from "react-redux";
import { updateWindowData } from "../../store/settingStore";
export default function Tasklist(props) {
  const [addTaskString, setAddTaskString] = React.useState("")
  const dispatch = useDispatch()
  
  async function addTask() {
    if(addTaskString !== "") {
      let newTasks = []
      for(let i=0; i<props.data.length; i++) {
        if(props.data[i] !== "") {
          newTasks.push(props.data[i])
        }
      }
      newTasks.push(addTaskString)
      dispatch(updateWindowData({idx: props.windowIdx, data: newTasks}))
      setAddTaskString("")
    }
  }

  async function handleKeyPress(key) {
    if(key === 'Enter') {
      await addTask()
    }
  }

  // Function remove item given array and index
  function removeTask(idx) {
    let newTasks = Array.from(props.data)
    newTasks[idx] = ""
    dispatch(updateWindowData({idx: props.windowIdx, data: newTasks}))
  }

  return(
    <div style={{minWidth:100}}>
      {props.data.map((obj,idx)=>{
        if(obj !== '') {
          return(
            <TaskItem 
              item={obj} 
              key={idx} 
              idx={idx} 
              removeTask={removeTask}
            />
          )
        }
      })}
      <Stack direction="row">
        <Checkbox disabled/>
        <Input disableUnderline 
          onChange={(e)=>{setAddTaskString(e.target.value)}} 
          value={addTaskString}
          onBlur={()=>{addTask()}}
          onKeyDownCapture={(e)=>{handleKeyPress(e.key)}}
        />
      </Stack>
    </div>
  )
}