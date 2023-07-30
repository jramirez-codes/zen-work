import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { TimelineOppositeContent } from '@mui/lab';
import data from "../../../../assets/text/AboutMeData.json"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function WorkExperiance() {
  const [expand, setExpand] = React.useState(true);
  return (
    <>
      <FormGroup>
        <FormControlLabel control={<Switch onClick={()=>{setExpand(!expand)}} defaultChecked value={expand}/>} label={expand?(""):("Flip Switch to Learn More")} />
      </FormGroup>
      <Timeline align="left">
        {data.workExp.map((obj, idx)=>{
          return(
            <TimelineItem key={idx}>
              <TimelineOppositeContent sx={{ flex: 0.2 }} color="textSecondary"> {obj.time}</TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                {(data.workExp.length - 1) !== idx?(
                  <TimelineConnector />
                ):(null)}
              </TimelineSeparator>
              <TimelineContent>
                {obj.title + " - " + obj.company}
                {expand ? (
                  <ul>
                    {obj.infoPoints.map((obj2, idx2) => {
                      return(
                        <li key={obj2+idx2}>{obj2}</li>
                      )
                    })}
                  </ul>
                ):(null)}
              </TimelineContent>
            </TimelineItem>
          )
        })}
      </Timeline>
    </>
  );
}