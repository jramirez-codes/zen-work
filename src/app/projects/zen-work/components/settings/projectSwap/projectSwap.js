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

export default function ProjectSwap() {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = React.useState(true)
  const projects = useSelector(e=>e.settings.projects)
  const currProject = useSelector(e=>e.settings.cacheName)
  return (
    <StyledSpeedDial
      ariaLabel="Projects"
      icon={<TopicIcon onClick={()=>{setIsOpen(!isOpen)}}/>}
      direction='right'
      open={isOpen}
      onClick={()=>{setIsOpen(!isOpen)}}
      sx={{position:'absolute', marginLeft:-3, marginTop:-3}}
    >
      <SpeedDialAction
          icon={<HomeIcon onClick={()=>{dispatch(swapState("home"))}} color={currProject === 'my-zen-work-home'?'primary':''}/>}
          tooltipTitle={'Home'}
      />
      {projects.map((obj, idx) => (
        <SpeedDialAction
          key={idx}
          icon={<TaskIcon onClick={()=>{dispatch(swapState(obj))}} color={currProject === 'my-zen-work-'+obj?'primary':''}/>}
          tooltipTitle={obj}
        />
      ))}
      <SpeedDialAction
          icon={<AddIcon onClick={()=>{dispatch(addState("newProject"))}}/>}
          tooltipTitle={'Add Project'}
          tooltipPlacement='right'
      />
    </StyledSpeedDial>
  );
}