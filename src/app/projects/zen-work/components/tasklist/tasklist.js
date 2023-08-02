import React from "react";
import Checkbox from '@mui/material/Checkbox';
import { Input, Stack } from "@mui/material";
import TaskItem from "./components/taskItem";
export default function Tasklist() {
  const [tasks, setTasks] = React.useState([])
  const [addTaskString, setAddTaskString] = React.useState("")

  function addTask() {
    if(addTaskString !== "") {
      let newTasks = []
      for(let i=0; i<tasks.length; i++) {
        if(tasks[i] !== "") {
          newTasks.push(tasks[i])
        }
      }
      newTasks.push(addTaskString)
      setTasks(newTasks)
      setAddTaskString("")
    }
  }

  function handleKeyPress(key) {
    if(key === 'Enter') {
      addTask()
    }
  }

  // Function remove item given array and index
  function removeTask(idx) {
    let newTasks = Array.from(tasks)
    newTasks[idx] = ""
    setTasks(newTasks)
  }

  return(
    <div style={{minWidth:100}}>
      {tasks.map((obj,idx)=>{
        return(
          <TaskItem 
            item={obj} 
            key={idx} 
            idx={idx} 
            removeTask={removeTask} 
          />
        )
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