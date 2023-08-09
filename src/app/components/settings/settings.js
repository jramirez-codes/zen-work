import React from "react";
import { TextField, Slider, ToggleButtonGroup, ToggleButton, Button } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import { setDisplayUrl, updateYoutubeUrl, updateOpacity, updateBackgroundType, organizeCards, deleteState, groupCardsCenter } from '../../store/settingStore'
export default function Settings() {
  const currURL = useSelector((state)=>state.settings.displayUrl)
  const currOpacity = useSelector((state)=>state.settings.backgroundOpacity)
  const currBackgroundType = useSelector((state)=>state.settings.backgroundType)
  const dispatch = useDispatch()
  const currProject = useSelector(e=>e.settings.cacheName)
  return(
    <div>
      <h3 style={{marginBottom:0, marginTop:0}}>Background Opacity</h3>
      <Slider
        max={1}
        min={0}
        value={currOpacity}
        step={.01}
        fullWidth
        valueLabelDisplay="auto"
        onChange={(e)=>{dispatch(updateOpacity(e.target.value))}}
      />
      {currBackgroundType === 'video'? (
        <TextField 
          label="Youtube URL" 
          value={currURL} 
          onChange={(e)=>{dispatch(setDisplayUrl(e.target.value))}} 
          onBlur={()=>{dispatch(updateYoutubeUrl())}}
          fullWidth
        />
      ):null}
      <h3 style={{marginBottom:5, marginTop:0}}>Background Type</h3>
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
      <h3 style={{marginBottom:5, marginTop:5}}>Organize Cards</h3>
      <Button variant="outlined" fullWidth onClick={()=>{dispatch(organizeCards())}}>Organize</Button>
      <h3 style={{marginBottom:5, marginTop:5}}>Group Cards</h3>
      <Button variant="outlined" fullWidth onClick={()=>{dispatch(groupCardsCenter())}}>Group Center</Button>
      {currProject !== 'my-zen-work-home'? (
        <>
          <h3 style={{marginBottom:5, marginTop:5}}>Delete Project</h3>
          <Button variant="outlined" color={'error'} fullWidth onClick={()=>{dispatch(deleteState())}}>Delete</Button>
        </>
      ):null}
    </div>
  )
}