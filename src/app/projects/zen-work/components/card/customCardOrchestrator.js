import React from "react";
import {useDispatch } from "react-redux";
import { motion, useAnimationControls } from 'framer-motion'
import { onWindowHoverEnter, onWindowHoverExit, updateAnyWindowDataTypeAndCache, updateAnyWindowDataType } from "../../store/settingStore";
import TimeKeeper from "../timer/timeKeeper";
import Notepad from "../notepad/notepad";
import Tasklist from "../tasklist/tasklist";
import Weather from "../weather/weather";
import CustomCard from "./customCard";
import Settings from "../settings/settings";

export default function CustomCardOrchestrator({obj, idx, currStyle, currLayers, currAnimation}) {
  const dispatch = useDispatch()
  const controls = useAnimationControls()
  const [currSize, setCurrSize] = React.useState({h:0,w:0})
  const sizeRef = React.useRef();

  // Inital Animation
  React.useEffect(()=>{
    async function initalAnimation() {
      await controls.start({
        opacity: 0,
        scale: 0.2,
        transition: {duration: 0}
      })
      await controls.start({
        opacity: 1,
        scale: 1,
        transition: {duration: 0.3}
      })
      await controls.start("hidden")
    }
    initalAnimation()
  },[])
  
  // Que Animation
  React.useEffect(()=>{
    async function queAnimation() {
      await controls.start(currAnimation)
      await controls.start("hidden")
    }
    queAnimation()
    dispatch(updateAnyWindowDataType({idx:idx, data: "hidden", dataType:'windowAnimation'}))
  },[currAnimation])

  // Track Size
  React.useEffect(()=>{
    if (sizeRef === undefined) {
      return;
    }
    // Check Width
    if(sizeRef.current.clientWidth > (currSize.h * 1.2) && sizeRef.current.clientWidth < (currSize.h * 0.8)) {
      return
    }
    // Check Height
    if(sizeRef.current.clientHeight > (currSize.w * 1.2) && sizeRef.current.clientHeight < (currSize.w * 0.8)) {
      return
    }
    dispatch(updateAnyWindowDataTypeAndCache({idx:idx, data: {h:sizeRef.current.clientHeight,w:sizeRef.current.clientWidth}, dataType:'windowSize'}))
    setCurrSize({h:sizeRef.current.clientHeight,w:sizeRef.current.clientWidth});
  },[sizeRef])

  return(  
    <>
      <motion.div 
        ref={sizeRef} 
        drag
        style={{minWidth:100, minHeight:100, zIndex:currLayers[idx]?3:2, position:'absolute'}}
        initial={{opacity: 1, scale: 1, x: obj.windowPosition.x-(window.innerWidth/2), y: obj.windowPosition.y-(window.innerHeight/2)}}
        whileDrag={{ scale: 1.05 }}
        onDragEnd={(_, info) => {dispatch(updateAnyWindowDataTypeAndCache({idx: idx, data: info.point, dataType: 'windowPosition'}))}}
        key={idx}
        onHoverStart={()=>{dispatch(onWindowHoverEnter(idx))}} 
        onHoverEnd={()=>{dispatch(onWindowHoverExit(idx))}}
      >
        {obj.windowType === 'timer'? (
          <CustomCard key={idx} windowIdx={idx} title={obj.title} currStyle={currStyle}>
            <TimeKeeper key={idx} expiryTimestamp={new Date()}/>
          </CustomCard>
        ):null}
        {obj.windowType === 'notepad'? (
          <CustomCard key={idx} windowIdx={idx} title={obj.title} currStyle={currStyle}>
            <Notepad key={idx} windowIdx={idx} data={obj.data}/>
          </CustomCard>
        ):null}
        {obj.windowType === 'tasklist'? (
          <CustomCard key={idx} windowIdx={idx} title={obj.title} currStyle={currStyle}>
            <Tasklist key={idx} windowIdx={idx} data={obj.data}/>
          </CustomCard> 
        ):null}
        {obj.windowType === 'weather'? (
          <CustomCard key={idx} windowIdx={idx} title={obj.title} currStyle={currStyle}>
            <Weather key={idx} windowIdx={idx}/>
          </CustomCard>
        ):null}
        {obj.windowType === 'settings'? (
          <CustomCard key={idx} windowIdx={idx} title={obj.title} currStyle={currStyle}>
            <Settings key={idx} windowIdx={idx}/>
          </CustomCard>
        ):null}
      </motion.div>
    </>
  )
}