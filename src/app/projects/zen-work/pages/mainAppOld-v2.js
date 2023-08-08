import React, {useState, useEffect, useRef} from "react";
import './global.css' 
import {useDispatch, useSelector} from "react-redux";
import debounce from "../helperFunctions/debounce";
import ControlsV2 from "../components/settings/controlsV2";
import { motion, useAnimationControls } from 'framer-motion'
import Background from "../components/background/background";
import { initalizeData } from "../store/settingStore";
import CustomCardOrchestrator from "../components/card/customCardOrchestrator";
import ProjectSwap from "../components/settings/projectSwap/projectSwap";
import { onWindowHoverEnter, onWindowHoverExit, updateAnyWindowDataTypeAndCache, updateCurrWindowPosition, updateAnyWindowDataType } from "../store/settingStore";
import TimeKeeper from "../components/timer/timeKeeper";
import Notepad from "../components/notepad/notepad";
import Tasklist from "../components/tasklist/tasklist";
import Weather from "../components/weather/weather";
import CustomCard from "../components/card/customCard";
import Settings from "../components/settings/settings";

export default function MainApp() {
  const dispatch = useDispatch()
  const [dim, setDim] = useState([1, 1])
  const constraintsRef = useRef(null)
  const currURL = useSelector((state)=>state.settings.youtubeUrl)
  const currentWindows = useSelector((state)=>state.settings.currentWindows)
  const currStyle = useSelector((state)=>state.settings.styleSettings)
  const currLayers = useSelector(state=>state.settings.currentLayers)
  const currBackgroundType = useSelector(state=>state.settings.backgroundType)
  const [toggleButton, setToggleButton] = useState(true)
  const animationControls = useAnimationControls()
  // Inital Window Data
  useEffect(()=>{
    setDim([window.innerWidth, window.innerHeight])
    dispatch(initalizeData())
  },[])
    
  // Window resizing
  useEffect(()=>{
    const debounceHandler =  debounce(function handleResize() {
      if(window !== undefined) {
        setDim([window.innerWidth, window.innerHeight])
      }
    }, 1000)
    window.addEventListener('resize', debounceHandler)
    return ()=>{window.removeEventListener('resize', debounceHandler)}
  },[])

  return(
    <>
      <motion.div className="container" ref={constraintsRef} style={{position: 'absolute', width:dim[0], height:dim[1]}}>
        <Background width={dim[0]} height={dim[1]} currURL={currURL} backgroundType={currBackgroundType}/>
        <ControlsV2 toggleButton={toggleButton} />
        <ProjectSwap toggleButton={toggleButton}setToggleButton={setToggleButton}/>
        {currentWindows.map((obj, idx) => {
          return(
              <motion.div
                className="item" 
                drag
                dragConstraints={constraintsRef}
                animate={animationControls}
                initial={{opacity: 1, scale: 1, x: obj.windowPosition.x-(window.innerWidth/2), y: obj.windowPosition.y-(window.innerHeight/2)}}
                whileDrag={{ scale: 1.05 }}
                onDragEnd={(_, info) => {dispatch(updateCurrWindowPosition({idx: idx, data: info.point}))}}
                key={idx}
                style={{zIndex:currLayers[idx]?3:2, position:'absolute', minWidth:100, minHeight:100}}
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
            )
          })}
        {/* {currentWindows.map((obj, idx) => {
          return(
              <CustomCardOrchestrator
                obj={obj}
                idx={idx} 
                currStyle={currStyle}
                currLayers={currLayers}
                constraintsRef={currLayers} 
                // currAnimation={curr}
                currAnimation={"hidden"}
              />
            )
          })} */}
      </motion.div>
    </>
  )
}