import React from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button } from '@mui/material';

export default function TimeKeeperV3(props) {
  const [currAlarm, setCurrAlarm] = React.useState(0)
  const [isRunning, setIsRunning] = React.useState(false)
  const [alarmDisplay, setAlarmDisplay] = React.useState(null)
  
  function onTimerReset() {
    setIsRunning(false)
    setCurrAlarm(0)
    console.log("timer ended")
  }

  function onTimerUpdate() {
    const currTime = Date.now()
    // Loop Timer Recursivly
    if(currTime < currAlarm) {
      console.log(currTime)
    }
    // Reset Timer State
    else {
      onTimerReset()
    }
  }

  function onTimerStart() {
    if(alarmDisplay === null || alarmDisplay === 'H:m:s') 
      return

    if(alarmDisplay.$H === NaN || alarmDisplay.$m === NaN || alarmDisplay.$s === NaN) 
      return

    if(alarmDisplay.$H === 0 && alarmDisplay.$m === 0 && alarmDisplay.$s === 0)
      return

    // Projected Alarm Date
    const currTime = Date.now()
    let newAlarm = currTime 
    + (alarmDisplay.$H === NaN ? 0: alarmDisplay.$H * 3600000) 
    + (alarmDisplay.$m === NaN ? 0: alarmDisplay.$m * 60000)
    + (alarmDisplay.$s === NaN ? 0: alarmDisplay.$s * 1000)
    
    // Update Backend

    // Start Alarm
    setCurrAlarm(newAlarm)
    setIsRunning(true)
    console.log('timer stasrted', newAlarm)
  }

  // Check to see if alarm is already saved
  React.useEffect(()=>{
    if(props.data !== undefined && props.data.length !== 0) {
      setCurrAlarm(props.data)
      setIsRunning(true)
    }
  },[])
  
  // Periodicly Update timer
  React.useEffect(()=>{
    if(isRunning) {
      const interval = setInterval(() => {
        onTimerUpdate()
      }, 500);
      return () => clearInterval(interval);
    }
  },[currAlarm])
  
  return(
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker 
          views={['hour','minutes', 'seconds']} 
          format="H:m:s"
          label="Set Alarm"
          value={alarmDisplay}
          onChange={(e)=>{setAlarmDisplay(e)}}
          slotProps={{ textField: { fullWidth: true } }}
        />
      </LocalizationProvider>
      <Button onClick={onTimerStart}>Start</Button>
      <Button onClick={onTimerReset}>Reset</Button>
    </>
  )
}