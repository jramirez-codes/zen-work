import React from "react";
import { TextField, Slider, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import { setDisplayUrl, updateYoutubeUrl, updateOpacity, updateBackgroundType } from '../../store/settingStore'
export default function Settings() {
  const currURL = useSelector((state)=>state.settings.displayUrl)
  const currOpacity = useSelector((state)=>state.settings.backgroundOpacity)
  const currBackgroundType = useSelector((state)=>state.settings.backgroundType)
  const dispatch = useDispatch()

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
    </div>
  )
}