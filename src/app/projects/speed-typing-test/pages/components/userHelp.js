import React, {useState, useEffect} from "react";

export default function UserHelp() {
  const [helpString, setHelpString] = useState("")
  const userHelp = "Hit \"Begin\" and start typing!"

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(()=>{
    const animationHandler = async () => {
      var strArray = userHelp.split("")
      var newHelpUpdate = ""

      for(var i = 0; i < strArray.length; i++) {
        newHelpUpdate += strArray[i]
        setHelpString(newHelpUpdate)
        await sleep(80)
      }
    }
    animationHandler()

  },[])

  return(
    <div className="display" style={{textAlign:'left'}}>
      <h2>{helpString}</h2>
    </div>
  )
}