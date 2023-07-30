import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Stack} from "@mui/material";
import data from '../../../../assets/text/AboutMeData.json'

export default function ContactMe() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState("")

  const handleOnClick = () => {
    // Make post request to getform.io
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "message": msg
      })
    };
    if(msg !== "FORM SUBMITTED") {
      fetch(data.getformEndPoint, requestOptions)
          .then(response => response.json())
    }
    
    setName("")
    setEmail("")
    setMsg("FORM SUBMITTED")
  }

  return(
    <>
      <h1 className="homeTitle">Contact Me</h1>
      <div className="dividerOuter" style={{marginBottom: '2vh'}}>
        <div className="dividerInner"/>
      </div>
      <Stack direction='row' spacing={1} style={{marginBottom:'1vh'}}>
        <TextField fullWidth value={name} onChange={(e)=>{setName(e.target.value)}} id="outlined-basic" label="Name" variant="outlined" style={{alignSelf:'center'}}/>
        <TextField fullWidth type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} id="filled-basic" label="Email" variant="outlined" />
      </Stack>
      <TextField fullWidth value={msg} onChange={(e)=>{setMsg(e.target.value)}} multiline rows='5' id="filled-basic" label="Message" variant="outlined" style={{marginBottom:'1vh'}}/>
      <Button variant="contained" onClick={()=>{handleOnClick()}}>Submit</Button>
    </>
  )
}