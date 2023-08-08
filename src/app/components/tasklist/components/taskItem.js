import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Input, Stack } from "@mui/material";

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

export default function TaskItem(props) {
  const [itemText, setItemText] = React.useState(props.item)
  async function handleDelete() {
    await delay(300);
    props.updateTask(props.idx, "")
  }

  React.useEffect(()=>{
    setItemText(props.item)
  },[props.item])

  return(
    <>
      <Stack direction="row" style={{marginBottom:-15}} alignItems="flex-start">
        <Checkbox onClick={()=>{handleDelete()}}/>
        <Input disableUnderline value={itemText}
          style={{marginTop:4}} 
          onChange={(e)=>{setItemText(e.target.value)}}
          onBlur={()=>{props.updateTask(props.idx, itemText)}}
          multiline
          fullWidth
        />
      </Stack>
    </>
  )
}