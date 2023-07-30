import React, {useEffect, useState, useRef} from "react";
import ConfettiExplosion from 'react-confetti-explosion';
import { Stack } from "@mui/material";

export default function Display(props) {
  const [typeHistory, setTypeHistory] = useState([])
  const [displayData, setDisplayData] = useState([])
  const [confetti, setConfetti] = useState(false)

  const colorCode = {
    correct: '#41b3a3',
    incorrect: '#e27d60',
    currIndex: '#085dcb'
  }

  // Refence is needed for Event Listener
  const typeHistoryRef = useRef(typeHistory)
  function refSetHistory(newItem) {
    typeHistoryRef.current = newItem
    setTypeHistory(newItem)
  }

  const displayDataRef = useRef(displayData)
  function refSetDisplay(newItem) {
    displayDataRef.current = newItem
    setDisplayData(newItem)
  }

  // Inital DisplayData
  useEffect(()=>{
    var configData = []
    props.answerKey.forEach((obj)=>{
      configData.push({
        statusColor: 'transparent',
        value: obj
      })
    })
    configData[0].statusColor = colorCode.currIndex
    setDisplayData(configData)
  },[])


  // Detect Finish
  useEffect(()=>{
    if(typeHistory.length === displayData.length && typeHistory.length !== 0) {      
      // Calculate Accuracy
      var correctNumb = 0
      displayData.forEach((obj)=>{
        if(obj.statusColor === colorCode.correct) {
          correctNumb += 1
        }
      })
      // Trigger finish
      props.handleFinish(Math.floor((correctNumb / displayData.length)*100))

      // Set Confetti
      const handleConfetti = async() => {
        setConfetti(true)
        await new Promise(r => setTimeout(r, 2200));
        setConfetti(false)
      }
      handleConfetti()

    }
  }, [typeHistory])

  // Handle Key Presses
  useEffect(()=>{
    // Key press handler
    const detectPress = (e) => {
      if(typeHistoryRef.current.length < props.answerKey.length || e.key === "Backspace") {
        // Get Data
        var newData = Array.from(typeHistoryRef.current)
        if(e.key.length === 1) {
          // Add to Type History
          newData.push(e.key)
        }
        else if(e.key === "Backspace") {
          // Remove from type history
          if(newData.length !== 0) {
            newData.pop()
          }
        }
        refSetHistory(newData)

        // Compare user vs. answer key
        var viewData = []
        props.answerKey.forEach((element,idx) => {
          // Only check elements in history
          if(idx < typeHistoryRef.current.length) {
            // Corrent Answer
            if(element[0] === typeHistoryRef.current[idx]) {
              viewData.push({
                statusColor: colorCode.correct,
                value: element
              })
            }
            // Incorrect Answer
            else {
              viewData.push({
                statusColor: colorCode.incorrect,
                value: typeHistoryRef.current[idx]
              })
            }
          }
          // Current Index
          else if(idx === typeHistoryRef.current.length) {
            viewData.push({
              statusColor: colorCode.currIndex,
              value: element
            })
          }
          else {
            viewData.push({
              statusColor: 'transparent',
              value: element
            })
          }
        });
        refSetDisplay(viewData)
      }
    }
    
    // Listen for key Inputs
    window.addEventListener('keydown', detectPress, true)
    // Remove event listener
    return () => window.removeEventListener('keydown', detectPress)
  },[])

  return(
    <div className="display">
      <>{confetti && <ConfettiExplosion style={{marginLeft:'50%'}}/>}</>
      <Stack direction={"row"} sx={{flexWrap: 'wrap'}}>
        {displayData.map((obj,idx)=>{
          if(obj.value === " ") {
            return(
              <div key={idx} style={{width:'10px', backgroundColor: obj.statusColor}}/>
            )
          }
          return(
            <h2 key={idx} style={{backgroundColor: obj.statusColor}}>{obj.value}</h2>
          )
        })}
      </Stack>
    </div>
  )
}