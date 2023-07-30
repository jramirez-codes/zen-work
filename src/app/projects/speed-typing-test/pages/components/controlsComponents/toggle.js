import React, {useState} from "react";
import { Grid, Box } from "@mui/material";

export default function TypeToggle(props) {
  const colorCode = {
    set: {backgroundColor:'#52af77'},
    unset: {}
  }
  const [currStyle, setCurrStyle] = useState([colorCode.unset, colorCode.set])


  function handleClick(genType) {
    console.log("toggle clicked ", genType)
    props.setGenType(genType)
    if(genType === "RS") {
      setCurrStyle([colorCode.unset, colorCode.set])
    }
    else {
      setCurrStyle([colorCode.set, colorCode.unset])
    }
  }

  return(
    <Box
      display="flex"
      justifyContent="center"
      style={{marginTop:'1vh', width:300}}
      >
      <Grid container direction="row" spacing={1} style={{textAlign:'center', maxWidth:"80%"}}>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <button onClick={()=>{handleClick("RW")}} style={currStyle[0]}>Random Words</button>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <button onClick={()=>{handleClick("RS")}} style={currStyle[1]}>Real Sentances</button>
        </Grid>
      </Grid>
  </Box>
  )
}
