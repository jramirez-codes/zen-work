import React, {useState} from "react";
import { Switch, TextField, Button, Grid, Box, Slider } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSelector, useDispatch } from 'react-redux'
import { setDisplayUrl, updateYoutubeUrl, addWindow, updateOpacity } from '../../store/settingStore'
import TimerIcon from '@mui/icons-material/Timer';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AddTaskIcon from '@mui/icons-material/AddTask';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export default function Controls() {
  const currURL = useSelector((state)=>state.settings.displayUrl)
  const currOpacity = useSelector((state)=>state.settings.backgroundOpacity)
  const [isHidden, setHidden] = useState(true)
  const dispatch = useDispatch()
  
  return(
    <div>
      <Box sx={{flexGrow:1}}
        display="flex" 
        justifyContent="center"
        style={{textAlign:'center'}}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button 
            variant="outlined" 
            fullWidth 
            onClick={()=>{dispatch(addWindow("timer"))}}
            startIcon={<TimerIcon />}
            >Timer</Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button variant="outlined"
            fullWidth 
            onClick={()=>{dispatch(addWindow("notepad"))}}
            startIcon={<NoteAddIcon />}>Notepad</Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button variant="outlined" 
            fullWidth
            onClick={()=>{dispatch(addWindow("tasklist"))}}
            startIcon={<AddTaskIcon />}>Tasklist</Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button variant="outlined" 
            fullWidth 
            onClick={()=>{dispatch(addWindow("weather"))}}
            startIcon={<ThermostatIcon />}>Weather</Button>
          </Grid>
        </Grid>
      </Box>
      {!isHidden?(
        <>
          <h2 style={{textAlign:'center'}}>Settings</h2>
          <TextField 
            label="Youtube URL"
            value={currURL} 
            onChange={(e)=>{dispatch(setDisplayUrl(e.target.value))}} 
            onBlur={()=>{dispatch(updateYoutubeUrl())}}
            fullWidth
          />
          <h3 style={{marginBottom:0}}>Background Opacity</h3>
          <Slider
            max={1}
            min={0}
            value={currOpacity}
            step={.01}
            fullWidth
            valueLabelDisplay="auto"
            onChange={(e)=>{dispatch(updateOpacity(e.target.value))}}
          />
        </>
      ):null}
        <FormGroup>
          <FormControlLabel control={<Switch onChange={()=>{setHidden(!isHidden)}}/>} label="Settings" />
        </FormGroup>
    </div>
  )
}