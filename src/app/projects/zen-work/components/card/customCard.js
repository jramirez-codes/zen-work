import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux'
import { deleteWindow } from '../../store/settingStore'
import {Grid} from '@mui/material';

export default function CustomCard(props) {
  const dispatch = useDispatch()
  const currStyle = useSelector((state)=>state.settings.styleSettings)
  return(
    <div className='paper' style={currStyle}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{marginTop:0, marginBottom:'1vh', marginLeft:0}}
      >
        <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
          <h2 style={{margin:0, textAlign:'left'}}>{props.title}</h2>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
          <ClearIcon size="small" onClick={()=>{dispatch(deleteWindow(parseInt(props.windowIdx)))}}/>
        </Grid>
      </Grid>
      {props.children}
    </div>
  )
}