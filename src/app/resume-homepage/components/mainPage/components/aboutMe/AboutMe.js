import React from "react";
import data from '../../../../assets/text/AboutMeData.json'
import WorkExperiance from "../workExperiance/workExp";
import Skills from "../skills/skills";

export default function AboutMe() {
  return(
    <>
      <h1 className="homeTitle">About Me</h1>
      <div className="dividerOuter">
        <div className="dividerInner"/>
      </div>
      <p>{data.aboutMe}</p>
      <h1 className="homeTitle">Work Experiance</h1>
      <div className="dividerOuter">
        <div className="dividerInner"/>
      </div>
      <WorkExperiance/>
      <h1 className="homeTitle">Skills</h1>
      <div className="dividerOuter">
        <div className="dividerInner"/>
      </div>
      <Skills/>
    </>
  )
}