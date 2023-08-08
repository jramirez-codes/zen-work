import React from "react";
import TimeKeeper from "./timeKeeper";

export default function Timer(props) {
  return(
    <TimeKeeper expiryTimestamp={new Date()}/>
  )
}