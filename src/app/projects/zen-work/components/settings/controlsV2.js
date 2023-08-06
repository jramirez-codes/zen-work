import * as React from 'react';
import { styled } from '@mui/material/styles';
import TimerIcon from '@mui/icons-material/Timer';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AddTaskIcon from '@mui/icons-material/AddTask';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch } from 'react-redux'
import { addWindow } from '../../store/settingStore'
import ProjectSwap from './projectSwap/projectSwap';

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

export default function ControlsV2() {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = React.useState(true)

  const actions = [
    { icon: <TimerIcon onClick={()=>{dispatch(addWindow("timer"))}}/>, name: 'Timer' },
    { icon: <ThermostatIcon onClick={()=>{dispatch(addWindow("weather"))}}/>, name: 'Weather' },
    { icon: <AddTaskIcon onClick={()=>{dispatch(addWindow("tasklist"))}}/>, name: 'Tasklist' },
    { icon: <NoteAddIcon onClick={()=>{dispatch(addWindow("notepad"))}}/>, name: 'Notepad' },
    { icon: <SettingsIcon onClick={()=>{dispatch(addWindow("settings"))}}/>, name: 'Settings' },
    { icon: <ProjectSwap onClick={()=>{dispatch(addWindow("settings"))}}/>, name: 'Projects' },
  ];

  return (
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          icon={<SpeedDialIcon onClick={()=>{setIsOpen(!isOpen)}}/>}
          direction='down'
          open={isOpen}
          sx={{ position: 'absolute', top:0, left: 0 }}
        >
          {actions.map((action) => {
            return(
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipPlacement={action.name !=='Projects'?"right": "bottom"}
              />
            )
          }
          )}
        </StyledSpeedDial>
  );
}