import React, {useState, useEffect, useRef} from "react";
import './global.css' 
import {useDispatch, useSelector} from "react-redux";
import debounce from "../helperFunctions/debounce";
import ControlsV2 from "../components/settings/controlsV2";
import Background from "../components/background/background";
import { initalizeData } from "../store/settingStore";
import CustomCardOrchestrator from "../components/card/customCardOrchestrator";
import ProjectSwap from "../components/settings/projectSwap/projectSwap";

export default function MainApp() {
  const dispatch = useDispatch()
  const currURL = useSelector((state)=>state.settings.youtubeUrl)
  const currentWindows = useSelector((state)=>state.settings.currentWindows)
  const currStyle = useSelector((state)=>state.settings.styleSettings)
  const currLayers = useSelector(state=>state.settings.currentLayers)
  const currBackgroundType = useSelector(state=>state.settings.backgroundType)
  const [toggleButton, setToggleButton] = useState(true)
  // Inital Window Data
  useEffect(()=>{
    dispatch(initalizeData())
  },[])

  return(
    <>
      <div className="container" style={{position: 'absolute', width:'100vw', height:'100vh'}}>
        <Background currURL={currURL} backgroundType={currBackgroundType}/>
        <ControlsV2 toggleButton={toggleButton} />
        <ProjectSwap toggleButton={toggleButton}setToggleButton={setToggleButton}/>
        {currentWindows.map((obj, idx) => {
          return(
            <CustomCardOrchestrator 
              obj={obj} 
              idx={idx} 
              currStyle={currStyle} 
              currLayers={currLayers}
              key={idx}
              currAnimation={obj.windowAnimation}
            />
            )
          })}
      </div>
    </>
  )
}