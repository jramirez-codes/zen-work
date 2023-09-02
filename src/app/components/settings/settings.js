import React from "react";
import { TextField, Slider, ToggleButtonGroup, ToggleButton, Button, Grid, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import { setDisplayUrl, updateYoutubeUrl, updateOpacity, updateBackgroundType, organizeCards, deleteState, groupCardsCenter } from '../../store/settingStore'
import OpenWithIcon from '@mui/icons-material/OpenWith';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

export default function Settings() {
  const currURL = useSelector((state)=>state.settings.displayUrl)
  const currOpacity = useSelector((state)=>state.settings.backgroundOpacity)
  const currBackgroundType = useSelector((state)=>state.settings.backgroundType)
  const dispatch = useDispatch()
  const currProject = useSelector(e=>e.settings.cacheName)
  return(
    <Grid container spacing={1} sx={{width:400}}>
      {/* BACKGROUND TYPE */}
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <p style={{margin:0}}>Card Opacity</p>
        <Slider
          max={1}
          min={0}
          value={currOpacity}
          step={.01}
          fullWidth
          valueLabelDisplay="auto"
          onChange={(e)=>{dispatch(updateOpacity(e.target.value))}}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {/* BACKGROUND SETTINGS */}
        {currBackgroundType === 'video'? (
          <TextField 
            label="Youtube URL" 
            value={currURL} 
            onChange={(e)=>{dispatch(setDisplayUrl(e.target.value))}} 
            onBlur={()=>{dispatch(updateYoutubeUrl())}}
            fullWidth
          />
        ):null}
      </Grid>
      {/* BACKGROUND TYPE */}
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Tooltip title="Background Type" placement="top">
          <ToggleButtonGroup
            color="primary"
            varient="outlined"
            value={currBackgroundType}
            exclusive
            onChange={(_, v)=>{dispatch(updateBackgroundType(v))}} 
            fullWidth
          >
            <ToggleButton value="gradient">Gradient</ToggleButton>
            <ToggleButton value="video">Youtube Video</ToggleButton>
          </ToggleButtonGroup>
        </Tooltip>
      </Grid>
      {/* CARD ORGINIZATION */}
      <Grid item xs={6} sm={6} md={6} lg={6}>
        <Tooltip title="Organize Cards" placement="left">
          <Button variant="outlined" fullWidth onClick={()=>{dispatch(organizeCards())}} startIcon={<OpenWithIcon/>}>Organize</Button>
        </Tooltip>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6}>
        <Tooltip title="Center Cards" placement="right">
          <Button variant="outlined" fullWidth onClick={()=>{dispatch(groupCardsCenter())}} startIcon={<CloseFullscreenIcon/>}>Center</Button>
        </Tooltip>
      </Grid>
      {/* DELETING PROJECT */}
      {currProject !== 'my-zen-work-home'? (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Button variant="outlined" color={'error'} fullWidth onClick={()=>{dispatch(deleteState())}}>Delete Project</Button>
        </Grid>
      ):null}
    </Grid>
  )
}