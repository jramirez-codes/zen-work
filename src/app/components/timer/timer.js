import React from "react";
// import TimeKeeper from "./timeKeeper/timeKeeper.js";
import TimeKeeperV2 from "./timeKeeper/timeKeeper-v2";
import TimeKeeperV3 from "./timeKeeper/timeKeeper-v3";
export default function TimerMain(props) {
  return(
    <TimeKeeperV3 {...props}/>
  )
}