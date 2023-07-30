import React from "react";
import { Stack, Box, Grid } from "@mui/material";

export default function Results(props) {
  return(
      <Box
        display="flex"
        justifyContent="center"
        style={{marginTop:'2vh'}}
        >
        <Stack spacing={1} style={{textAlign:'center'}}>
          <div style={{backgroundColor: "rgb(82, 175, 119)", borderRadius:'5px', padding:"3%", marginTop:'-1vh'}}>
            <h4>Typing test complete!</h4>
          </div>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={9} sm={9} md={9} lg={9}>
              <h4 style={{textAlign:'left'}}>Words per Min</h4>
            </Grid>
            {/* <Grid item xs={1} sm={1} md={1} lg={1}/> */}
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <div className="infoDiv">{props.wpm}</div>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={9} sm={9} md={9} lg={9}>
              <h4 style={{textAlign:'left'}}>Typing Accuracy</h4>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <div className="infoDiv">{props.accuracy}</div>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <h4 style={{textAlign:'left'}}>Points</h4>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4}/>
            <Grid item xs={5} sm={5} md={5} lg={5}>
              <div className="infoDiv">{(props.accuracy*props.wpm)}</div>
            </Grid>
          </Grid>
        </Stack>
      </Box>
  )
}