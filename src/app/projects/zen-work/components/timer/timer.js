import React, {useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deleteWindow } from '../../store/settingStore'
import { Stack, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import TimeKeeper from "./timeKeeper";

export default function Timer(props) {
  const dispatch = useDispatch()

  return(
    <div>
      <IconButton variant="outlined"
        style={{
          position: 'absolute',
          left: '85%',
          top: '0'
        }}
      >
        <ClearIcon size="small" onClick={()=>{dispatch(deleteWindow(parseInt(props.windowIdx)))}}/>
      </IconButton>
      <h1 style={{margin:0, minWidth:200}}>Timer {props.windowIdx}</h1>
      <TimeKeeper expiryTimestamp={new Date()}/>
    </div>
  )
}