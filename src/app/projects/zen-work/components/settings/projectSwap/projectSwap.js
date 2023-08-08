import * as React from 'react';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux'
import { addState, swapState } from '../../../store/settingStore'
import TopicIcon from '@mui/icons-material/Topic';
import TaskIcon from '@mui/icons-material/Task';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

export default function ProjectSwap(props) {
  const dispatch = useDispatch()
  const projects = useSelector(e=>e.settings.projects)
  const currProject = useSelector(e=>e.settings.cacheName)
  return (
    <StyledSpeedDial
      ariaLabel="Projects"
      icon={<TopicIcon onClick={()=>{props.setToggleButton(!props.toggleButton)}}/>}
      direction='right'
      open={props.toggleButton}
      sx={{ position: 'absolute', top:0, left: 0 }}
    >
      <SpeedDialAction
          icon={<HomeIcon onClick={()=>{dispatch(swapState("home"))}} color={currProject === 'my-zen-work-home'?'primary':''}/>}
          tooltipTitle={'Home'}
      />
      {projects !== undefined ? projects.map((obj, idx) => {
        return(
          <SpeedDialAction
            key={idx}
            icon={<TaskIcon onClick={()=>{dispatch(swapState(obj))}} color={currProject === 'my-zen-work-'+obj?'primary':''}/>}
            tooltipTitle={obj}
          />
        )
      }): null}
      <SpeedDialAction
          icon={<AddIcon onClick={()=>{dispatch(addState("newProject"))}}/>}
          tooltipTitle={'Add Project'}
          tooltipPlacement='right'
      />
    </StyledSpeedDial>
  );
}