import React, {useState, useEffect, useRef} from "react";
import './global.css' 
import {useDispatch, useSelector} from "react-redux";
import debounce from "../helperFunctions/debounce";
import Controls from "../components/settings/controls";
import ControlsV2 from "../components/settings/controlsV2";
import { motion } from 'framer-motion'
import { onWindowHoverEnter, onWindowHoverExit } from "../store/settingStore";
import TimeKeeper from "../components/timer/timeKeeper";
import Notepad from "../components/notepad/notepad";
import Tasklist from "../components/tasklist/tasklist";
import Weather from "../components/weather/weather";
import CustomCard from "../components/card/customCard";
import Background from "../components/background/background";
import Settings from "../components/settings/settings";

export default function MainApp() {
  const [dim, setDim] = useState([1,1])
  const constraintsRef = useRef(null)
  const dispatch = useDispatch()
  const currURL = useSelector((state)=>state.settings.youtubeUrl)
  const currentWindows = useSelector((state)=>state.settings.currentWindows)
  const currStyle = useSelector((state)=>state.settings.styleSettings)
  const currLayers = useSelector(state=>state.settings.currentLayers)
  const currBackgroundType = useSelector(state=>state.settings.backgroundType)
  
  // Inital Window Size
  useEffect(()=>{
    setDim([window.innerWidth, window.innerHeight])
  },[])
  
  // Window resizing
  useEffect(()=>{
    const debounceHandler =  debounce(function handleResize() {
      setDim([window.innerWidth, window.innerHeight])
    }, 1000)
    window.addEventListener('resize', debounceHandler)
    return ()=>{window.removeEventListener('resize', debounceHandler)}
  },[])

  return(
    <motion.div className="container" ref={constraintsRef} style={{width:dim[0], height:dim[1]}}>
      <Background width={dim[0]} height={dim[1]} currURL={currURL} backgroundType={currBackgroundType}/>
      <ControlsV2/>
      {currentWindows.map((obj, idx) => {
        return(
          <motion.div 
            className="item" 
            drag 
            dragConstraints={constraintsRef} 
            key={idx}
            style={{zIndex:currLayers[idx]?3:2}}
            onHoverStart={()=>{dispatch(onWindowHoverEnter(idx))}} 
            onHoverEnd={()=>{dispatch(onWindowHoverExit(idx))}}
          >
              {obj === 'timer'? (
                <CustomCard key={idx} windowIdx={idx} title='Timer' currStyle={currStyle}>
                  <TimeKeeper key={idx} expiryTimestamp={new Date()}/>
                </CustomCard>  
              ):null}
              {obj === 'notepad'? (
                <CustomCard key={idx} windowIdx={idx} title='Notepad' currStyle={currStyle}>
                  <Notepad key={idx} windowIdx={idx}/>
                </CustomCard>
              ):null}
              {obj === 'tasklist'? (
                <CustomCard key={idx} windowIdx={idx} title='Tasklist' currStyle={currStyle}>
                  <Tasklist key={idx} windowIdx={idx}/>
                </CustomCard> 
              ):null}
              {obj === 'weather'? (
                <CustomCard key={idx} windowIdx={idx} title='Weather' currStyle={currStyle}>
                  <Weather key={idx} windowIdx={idx}/>
                </CustomCard>
              ):null}
              {obj === 'settings'? (
                <CustomCard key={idx} windowIdx={idx} title='Settings' currStyle={currStyle}>
                  <Settings key={idx} windowIdx={idx}/>
                </CustomCard>
              ):null}
          </motion.div>
        )
      })}
    </motion.div>
  )
}