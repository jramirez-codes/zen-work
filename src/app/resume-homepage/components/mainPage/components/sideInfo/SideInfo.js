import { Typography, Button} from "@mui/material";
import React from "react";
import profilePic from '../../../../assets/images/Me.png'
import './SideInfo.css'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Stack from '@mui/material/Stack';
import data from "../../../../assets/text/AboutMeData.json"
// import resume from "../../../../assets/resume.pdf"
import Box from "@mui/material/Box";

export default function SideInfo() {
  return(
    <Box className="sideGrid">
      <img alt="me" src={profilePic} className="profilePic"/>
      <Stack direction="row" spacing={0}>
        <h1 className="titleFont1">{data.firstName}</h1>
        <h1 className="titleFont2">{data.lastName}</h1>
      </Stack>
      <Stack className="textBubble" direction="column">
        <Typography variant="p" gutterBottom>{data.degree}</Typography>
        <Typography variant="p" gutterBottom>{data.university}</Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <LocationOnOutlinedIcon/>
        <Typography variant="p" gutterBottom className="black">{data.location}</Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <MailOutlineOutlinedIcon/>
        <a href={"mailto:"+data.email}>
          <Typography variant="p" gutterBottom className="black">{data.email}</Typography>
        </a>
      </Stack>
      {/* <div style={{marginTop:"2vh"}}>
        <Button 
          variant="contained" 
          endIcon={<FileDownloadOutlinedIcon />} 
          style={{borderRadius:"20px"}}
          onClick={()=>{window.location.href = resume}}>
          Download Resume
        </Button>
      </div> */}
    </Box>
  )
}