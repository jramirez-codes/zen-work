import React, {useState, useEffect} from "react";
import {Stack, Box} from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function Rankings() {
  const [leaderboard, setLeaderboard] = useState([])

  async function handleReqeust() {
    // Get Data from database
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "7DuCUFadEqddM4DXwbAda3Oh2xoUM5waruqFNrO3");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      origin: '*'
    };
    var response = await fetch("https://z8dyscfy05.execute-api.us-east-2.amazonaws.com/default/speed-typing-test", requestOptions)
    var data = await response.json()

    // Sort Data
    var sortedData = await data["Items"].sort((a,b)=> a.id.N - b.id.N)
    setLeaderboard(sortedData)

    // Sort Data
    return data["Items"]
  }

  useEffect(()=>{
    handleReqeust()
  },[])

  return(
    <Box
      display="flex"
      justifyContent="center"
      style={{marginTop:'2vh'}}
      >
      <div className="leaderboard">
        <Box
        display="flex"
        justifyContent="center"
        style={{marginTop:'2vh', marginLeft:"2vw", marginRight:'2vw'}}
        >
          <Stack direction="row" spacing={2}>
            <AutoAwesomeIcon style={{marginTop:'1vh'}} color="warning"/>
            <h1>Leaderboard</h1>
            <AutoAwesomeIcon style={{marginTop:'1vh'}} color="error"/>
          </Stack>
        </Box>
        <Box
        display="flex"
        justifyContent="center"
        style={{marginTop:'2vh', marginLeft:"2vw", marginRight:'2vw'}}
        >
          <Stack direction="column" spacing={1}>
            <Stack
            direction="row"
            spacing={1}
            >
              <div className="infoDiv" style={{width:"40px"}}>Rank</div>
              <div className="infoDiv" style={{width:"80px"}}>Player</div>
              <div className="infoDiv" style={{width:"75px"}}>Points</div>
              <div className="infoDiv" style={{width:"45px"}}>WPM</div>
              <div className="infoDiv" style={{width:"65px"}}>Accuracy</div>
            </Stack>
            {leaderboard.map((obj, idx)=> {
              return(
                <Stack
                direction="row"
                spacing={1}
                key={idx}
                >
                  <div className="infoDiv" style={{width:"40px"}}>{"#"+(idx+1)}</div>
                  <div className="infoDiv" style={{width:"80px"}}>{obj.playerName.S}</div>
                  <div className="infoDiv" style={{width:"75px"}}>{obj.points.N}</div>
                  <div className="infoDiv" style={{width:"45px"}}>{obj.wpm.N}</div>
                  <div className="infoDiv" style={{width:"65px"}}>{obj.accuracy.N+"%"}</div>
                </Stack>
              )
            })}
          </Stack>
        </Box>
      </div>
    </Box>
  )
}