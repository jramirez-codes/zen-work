import React from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button, Stack } from '@mui/material';

export default function TimeKeeperV3(props) {
  const [currAlarm, setCurrAlarm] = React.useState(0)
  const [isRunning, setIsRunning] = React.useState(false)
  const [inputTimerDisplay, setInputTimerDisplay] = React.useState(null)
  const [activeTimerDispaly, setActiveTimerDisplay] = React.useState('00:00:00')
  const alarmSound = new Audio('./staticAssets/sounds/alarm_beep.wav')
  
  function onTimerReset() {
    setIsRunning(false)
    setCurrAlarm(0)
  }

  function onTimerUpdate() {
    const currTime = Date.now()
    // Loop Timer Recursivly
    if(currTime < currAlarm) {
      // Update Remaining Time
      let dt = Math.abs(Math.floor((currAlarm - currTime)/1000));
      let min, sec, hour
      hour = Math.floor(dt / 3600);
      min = Math.floor((dt % 3600) / 60);
      sec = dt % 60;
      // console.log(`${hour<=9?'0'+hour:hour}:${min<=9?'0'+min:min}:${sec<=9?'0'+sec:sec}`)
    
      // Update Visual Timer
      setActiveTimerDisplay(`${hour<=9?'0'+hour:hour}:${min<=9?'0'+min:min}:${sec<=9?'0'+sec:sec}`)
    }
    // Reset Timer State
    else {
      // Play Timer Sounds
      alarmSound.play()
      onTimerReset()
    }
  }

  function onTimerStart() {
    if(inputTimerDisplay === null || inputTimerDisplay === 'H:m:s') 
      return

    if(inputTimerDisplay.$H === NaN || inputTimerDisplay.$m === NaN || inputTimerDisplay.$s === NaN) 
      return

    if(inputTimerDisplay.$H === 0 && inputTimerDisplay.$m === 0 && inputTimerDisplay.$s === 0)
      return

    // Projected Alarm Date
    const currTime = Date.now()
    let newAlarm = currTime 
    + (inputTimerDisplay.$H === NaN ? 0: inputTimerDisplay.$H * 3600000) 
    + (inputTimerDisplay.$m === NaN ? 0: inputTimerDisplay.$m * 60000)
    + (inputTimerDisplay.$s === NaN ? 0: inputTimerDisplay.$s * 1000)
    
    // Update Backend

    // Start Alarm
    setCurrAlarm(newAlarm)
    setIsRunning(true)
    // console.log('timer stasrted', newAlarm)
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
      {isRunning?(
        <h1 style={{textAlign:'center'}}>{activeTimerDispaly}</h1>
      ): null}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker 
          views={['hour','minutes', 'seconds']} 
          format="H:m:s"
          label="Set Alarm"
          value={inputTimerDisplay}
          onChange={(e)=>{setInputTimerDisplay(e)}}
          slotProps={{ textField: { fullWidth: true } }}
          disabled={isRunning}
        />
      </LocalizationProvider>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={0}
      >
        <Button onClick={onTimerStart}>Start</Button>
        <Button onClick={onTimerReset}>Reset</Button>
      </Stack>
    </>
  )
}