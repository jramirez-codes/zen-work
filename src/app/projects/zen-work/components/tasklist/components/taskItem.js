import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Input, Stack } from "@mui/material";

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

export default function TaskItem(props) {
  async function handleDelete() {
    await delay(300);
    props.removeTask(props.idx)
  }

  return(
    <>
    {props.item !== ""?(
      <Stack direction="row" style={{marginBottom:-15}}>
        <Checkbox onClick={()=>{handleDelete()}}/>
        <Input disableUnderline value={props.item}/>
      </Stack>
    ):null}
    </>
  )
}