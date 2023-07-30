import React, {useState, useEffect, useRef} from "react";
import { Stack, Box, Grid } from "@mui/material";
import WordsSlider from "./controlsComponents/slider";
import TypeToggle from "./controlsComponents/toggle";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function Controls(props) {
  const [words, setWords] = useState(30)
  const [timer, setTimer] = useState("00:00")
  const [genType, setGenType] = useState("RS")
  
  // For Styles
  const [newStyle, setNewStyle] = useState({})
  const headerOffset = 60

  // Used for finding size of div
  const ref = useRef(null);

  // Inital Div
  useEffect(() => {
    if(ref.current && window.innerWidth) {
      if((window.innerWidth - ref.current.offsetWidth) > 50) {
        var newHeight = window.innerHeight - headerOffset
        // setNewStyle({maxHeight: "100%", height:newHeight})
      }
    }
  }, []);

  // Refence is needed for setInterval
  const timerRef = useRef(timer)
  function refSetTimer(newItem) {
    timerRef.current = newItem
    setTimer(newItem)
  }

  // Event Listener for window resize
  useEffect(()=>{
    function handleResize() {
      if(ref.current && window.innerWidth) {
        if((window.innerWidth - ref.current.offsetWidth) > 50) {
          var newHeight = window.innerHeight - headerOffset
          // setNewStyle({maxHeight: "100%", height: newHeight})
        }
        else {
          setNewStyle({})
        }
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  },[])

  // Timer Used for value
  useEffect(()=>{
    if(!props.hadEnded && props.hasStarted) {
      const myTimer = setInterval(()=>{
        var timeCurr = new Date()
        var timeDiff = timeCurr.getTime() - (props.start + 100)
        if(timeDiff < 0) {
          timeDiff = 0
        }
        timeDiff = Math.floor(timeDiff/10)

        // Parse time into ms and sec
        var ms = (timeDiff % 100).toString()
        var sec = (Math.floor(timeDiff/100) % 100).toString()
        if(ms.length === 1) {
          ms = "0" + ms
        }
        if(sec.length === 1) {
          sec = "0" + sec
        }
        if(sec === null || ms === null) {
          sec = "00"
          ms = "00"
        }
        var timeString = sec + ":" + ms
  
        // Set Timer
        refSetTimer(timeString)
      }, 10)
  
      return () => clearInterval(myTimer)
    }
  },[props])

  function handleButton() {
    // To make sure button doesnt click when space bar is bressed
    if(!props.hasStarted) {
      if(words !== "") {
        props.handleClick(words, genType)
      }
      else {
        alert("Number of word must be a integer")
        setWords(5)
      }
      console.log("button Clicked")
    }

  }

  return(
    <div ref={ref} style={newStyle}>
      <Box
        display="flex"
        justifyContent="center"
        >
        <Stack direction="column" spacing={1} style={{textAlign:'center'}}>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={8} sm={8} md={8} lg={8}>
              <h4>Number of Words</h4>
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1}/>
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <div className="infoDiv">{words}</div>
            </Grid>
          </Grid>
          <WordsSlider setWords={setWords}/>
        </Stack>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        >
        <Stack direction="column" spacing={1} style={{textAlign:'center'}}>
          <Grid container direction="row" spacing={1} style={{paddingLeft:'30px', paddingRight:"35px"}}>
            <Grid item xs={7} sm={7} md={7} lg={7}>
              <h4>Sentance Type</h4>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2}/>
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <div className="infoDiv">{genType}</div>
            </Grid>
          </Grid>
          <TypeToggle genType={genType} setGenType={setGenType}/>
        </Stack>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        style={{marginTop:'2vh'}}
        >
        <Stack direction="column" spacing={1} style={{textAlign:'center'}}>
          <Grid container direction="row" spacing={1} style={{paddingLeft:'35px', paddingRight:"35px"}}>
            <Grid item xs={7} sm={7} md={7} lg={7}>
              <h4>Generate Prompt</h4>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2}/>
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <div className="infoDiv">{timer}</div>
            </Grid>
          </Grid>
          <Box
            display="flex"
            justifyContent="center"
            style={{marginTop:'1vh', width:300}}
          >
            <Grid container direction="row" spacing={1} style={{textAlign:'center', maxWidth:"80%"}}>
              <Grid item xs={9} sm={9} md={9} lg={9}>
                <button onClick={()=>{handleButton()}} style={{width:"100%", height: "100%"}}>Begin</button>
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                <button onClick={()=>{props.handleReset(); setTimer("00:00")}} style={{width:"100%", paddingTop:'5px'}}><RestartAltIcon/></button>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
    </div>
  )
}