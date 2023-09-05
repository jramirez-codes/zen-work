import React from "react";
import { TextField, ToggleButtonGroup, ToggleButton, Button, Grid, Tooltip} from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import { AlphaPicker, HuePicker } from "react-color";
import { setDisplayUrl, updateYoutubeUrl, updateBackgroundColor, updateBackgroundType, organizeCards, deleteState, groupCardsCenter } from '../../store/settingStore'
import OpenWithIcon from '@mui/icons-material/OpenWith';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

export default function Settings() {
  const dispatch = useDispatch()
  const currURL = useSelector((state)=>state.settings.displayUrl)
  const currBackgroundType = useSelector((state)=>state.settings.backgroundType)
  const currColor = useSelector((state)=>state.settings.backgroundColor)
  const currProject = useSelector(e=>e.settings.cacheName)

  return(
    <Grid container spacing={1} sx={{width:400}}>
      {/* BACKGROUND COLOR */}
      <Grid item xs={10} sm={10} md={10} lg={10}>
        <HuePicker width="100%" onChangeComplete={(e)=>{dispatch(updateBackgroundColor({rgb:{r:e.rgb.r,g:e.rgb.g,b:e.rgb.b, a:currColor.rgb.a}}))}} color={currColor.rgb}/>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1}>
        <div style={{height:'100%', backgroundColor:'white', borderStyle:'solid', borderWidth:1, borderColor:'gray'}} onClick={()=>{dispatch(updateBackgroundColor({rgb:{r:255,g:255,b:255, a:currColor.rgb.a}}))}}/>
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1}>
        <div style={{height:'100%', backgroundColor:'black', borderStyle:'solid', borderWidth:1, borderColor:'gray'}} onClick={()=>{dispatch(updateBackgroundColor({rgb:{r:0,g:0,b:0, a:currColor.rgb.a}}))}}/>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <AlphaPicker width="100%" onChangeComplete={(e)=>{dispatch(updateBackgroundColor(e))}} color={currColor.rgb}/>
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