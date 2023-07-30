import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import { Grid } from '@mui/material';
import data from "../../../../assets/text/AboutMeData.json"

export default function Skills() {
  const [hard, setHard] = React.useState(true)
  const [soft, setSoft] = React.useState(true)

  return (
    <div style={{marginTop:"2vh"}}>
      <Accordion expanded={hard} style={{borderRadius:"20px"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={()=>{setHard(!hard)}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography variant="h6">Hard Skills</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item sx={12} md={12} lg={6}>
              <div style={{textAlign:'center'}}>
                <p>Technical Skills</p>
              </div>
              <Grid container direction="row" spacing={1}>
                {data.skills.hardSkills.techicalSkills.map((obj,idx)=>{
                  return(
                    <Grid item sx={2} key={obj+idx}>
                      <Chip key={obj+idx} label={obj} color="primary" variant="outlined" />
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
            <Grid item sx={12} md={12} lg={6}>
              <div style={{textAlign:'center'}}>
                <p>Programing Languages</p>
              </div>
              <Grid container direction="row" spacing={1}>
                {data.skills.hardSkills.languages.map((obj,idx)=>{
                  return(
                    <Grid item sx={2} key={obj+idx}>
                      <Chip key={obj+idx} label={obj} color="primary" variant="outlined" />
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={soft} style={{borderRadius:"20px"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={()=>{setSoft(!soft)}}/>}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h6">Soft Skills</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="row" spacing={1}>
            {data.skills.softSkills.map((obj,idx)=>{
              return(
                <Grid item sx={1} key={idx}>
                  <Chip key={idx} label={obj} color="primary" variant="outlined" />
                </Grid>
              )
            })}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}