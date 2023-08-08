import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { Button, TextField, Stack } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

export default function TimeKeeper({ expiryTimestamp}) {
  const [displayTime, setDisplayTime] = useState("")
  const [currTime, setCurrTime] = useState(expiryTimestamp)

  const {
    seconds,
    minutes,
    hours,
    isRunning,
    pause,
    resume,
    restart,
  } = useTimer({ currTime, onExpire: () => console.warn('onExpire called') });

  // Configure Timer
  function handleTimer(e) {
    // Vars
    var data = e.split(':')
    var time = new Date()
    // Configure Time
    if(data.length === 3) {
      time.setMinutes(time.getMinutes() + parseInt(data[0])*60)
      time.setMinutes(time.getMinutes() + parseInt(data[1]))
      time.setSeconds(time.getSeconds() + parseInt(data[2]))
    }
    else if(data.length === 2) {
      time.setMinutes(time.getMinutes() + parseInt(data[0]))
      time.setSeconds(time.getSeconds() + parseInt(data[1]))
    }
    else {
      time.setSeconds(time.getSeconds() + parseInt(data[0]))
    }
    setCurrTime(time)

    return time
  }

  // Handle Text input
  function handleText(e) {
    var reg = /[\d|\d\d]:[\d|\d\d]:[\d|\d\d]:?|[\d|\d\d]:[\d|\d\d]|[\d|\d\d]/g;
    if(e.match(reg)) {
      restart(handleTimer(e))
    }
    else {
      setDisplayTime("")
    }
  }

  // Handle Reset
  function handleReset() {
    restart(handleTimer(displayTime))
  }

  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '100px'}}>
        <span>{hours<10?"0"+hours:hours}</span>:<span>{minutes<10?"0"+minutes:minutes}</span>:<span>{seconds<10?"0"+seconds:seconds}</span>
      </div>
      <Stack direction="row" spacing={1}>
        <TextField  
          label="Timer" 
          variant="outlined" 
          onChange={(e)=>{setDisplayTime(e.target.value)}}
          onBlur={(e)=>{handleText(e.target.value)}}
          value={displayTime}
        />
        {isRunning?(
          <Button 
            variant="outlined"
            color='primary'
            size="large"
            onClick={pause}
          >
            <PauseCircleIcon/>
          </Button>
        ):(
          <Button 
          variant="outlined"
          color='primary'
          size="large"
          onClick={resume}
          >
            <PlayCircleIcon/>
          </Button>
        )}
        <Button 
            variant="outlined"
            color='primary'
            size="large"
            onClick={() => {handleReset()}}
          >
            <RotateLeftIcon />
        </Button>
      </Stack>
    </div>
  );
}