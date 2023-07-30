import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import debounce from "../helperFunctions/debounce";
import Controls from "../components/settings/controls";
import {motion} from 'framer-motion'
import Timer from "../components/timer/timer";
import './global.css'
import { onWindowHoverEnter, onWindowHoverExit } from "../store/settingStore";
import Notepad from "../components/notepad/notepad";
import Tasklist from "../components/tasklist/tasklist";
import Weather from "../components/weather/weather";

export default function MainApp() {
  const [dim, setDim] = useState([1,1])
  // const [dim, setDim] = useState([0, 0])
  const [overlayer, setOverlay] = useState(false)
  const constraintsRef = useRef(null)
  const dispatch = useDispatch()
  const currURL = useSelector((state)=>state.settings.youtubeUrl)
  const currentWindows = useSelector((state)=>state.settings.currentWindows)
  const currStyle = useSelector((state)=>state.settings.styleSettings)
  const currLayers = useSelector(state=>state.settings.currentLayers)

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
      <iframe 
        width={dim[0]}
        height={dim[1]}
        src={currURL}
        title="YouTube video player" 
        frameBorder="0" 
        allowFullScreen
        style={{position:"fixed"}}
        />
      <motion.div 
        className="item" 
        style={{zIndex:overlayer?3:2, maxWidth:'250px'}} 
        drag 
        dragConstraints={constraintsRef} 
        onHoverStart={()=>{setOverlay(true)}} 
        onHoverEnd={()=>{setOverlay(false)}}
      >
        <Controls/>
      </motion.div>
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
                <div className="paper" style={currStyle}>
                  <Timer windowIdx={idx}/>
                </div>  
              ):null}
              {obj === 'notepad'? (
                <div className="paper" style={currStyle}>
                  <Notepad windowIdx={idx}/>
                </div>  
              ):null}
              {obj === 'tasklist'? (
                <div className="paper" style={currStyle}>
                  <Tasklist windowIdx={idx}/>
                </div>  
              ):null}
              {obj === 'weather'? (
                <div className="paper" style={currStyle}>
                  <Weather windowIdx={idx}/>
                </div>  
              ):null}
          </motion.div>
        )
      })}
    </motion.div>
  )
}