import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deleteWindow } from '../../store/settingStore'
import { Stack, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

export default function Notepad(props) {
  const dispatch = useDispatch()

  return(
    <div>
      <textarea style={{
        width:'100%',
        minWidth: 200,
        border:0,
        backgroundColor: 'transparent'
      }}/>
    </div>
  )
}