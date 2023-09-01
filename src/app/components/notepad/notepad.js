import React from "react";
import { useDispatch } from 'react-redux'
import { updateWindowData } from "../../store/settingStore";
import { TextField } from "@mui/material";

export default function Notepad(props) {
  const dispatch = useDispatch()
  const [notes, setNotes] = React.useState(props.data[0]===null? "": props.data[0])

  React.useEffect(()=>{
    if(props.data !== null) {
      setNotes(props.data[0]===null? "": props.data[0])
    }
  },[props.data])

  return(
    <TextField
      fullWidth
      multiline
      maxRows={4}
      onChange={(e)=>{setNotes(e.target.value)}}
      onBlur={()=>{dispatch(updateWindowData({idx: props.windowIdx, data: [notes]}))}}
    />
  )
}