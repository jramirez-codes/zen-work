import React from "react";
import { useStaticQuery, graphql} from "gatsby";
import ImgMediaCard from './components/card'
import {motion} from 'framer-motion'
import { Grid } from "@mui/material";
import ParseMarkdown from './components/parseData'

export default function Portfolio() {
  const data = useStaticQuery(graphql` {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/project.md$/"}}) {
      edges {
        node {
          frontmatter {
            date
            path
            title
            currData
            cover {
              childImageSharp {
                fluid(maxWidth: 288) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
            excerpt
          }
        }
      }
    }
  }`).allMarkdownRemark.edges

  const [allData, setAllData] = React.useState(data)
  const [currPage, setPage] = React.useState([])
  const [projectTitle, setTitle] = React.useState("")
  const [projectPath, setPath] = React.useState("")

  const setNewData = (title) => {
    var newData = []
    for(var i=0;i<data.length;i++) {
      // // console.log("New update", projectTitle, data[i].node.frontmatter.title)
      if(title !== data[i].node.frontmatter.title) {
        newData.push(data[i])
      }
    }
    setAllData(newData)

  }

  return(
    <>{currPage.length === 0 ? (
      <>
        <h1 className="homeTitle">My Portfolio</h1>
        <div className="dividerOuter" style={{marginBottom: '2vh'}}>
          <div className="dividerInner"/>
        </div>
      </>
      )
      : 
      (
        <>
          <h1 className="homeTitle">{projectTitle}</h1>
          <div className="dividerOuter" style={{marginBottom: '2vh'}}>
            <div className="dividerInner"/>
          </div>
          <ParseMarkdown data={currPage} path={projectPath}/>
          <h1 className="homeTitle">Explore Other Projects</h1>
          <div className="dividerOuter" style={{marginBottom: '2vh'}}>
            <div className="dividerInner"/>
          </div>
        </>
      )
    }
      <Grid container spacing={2}>
        {allData.map((val,key)=>{
          // // console.log(val, key, projectKey)
          return(
            <Grid item key={key}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }} 
              >
                <ImgMediaCard key={key} data={val} update={(v)=>setPage(v)} newTitle={(e)=>{setTitle(e)}} updatePath={(e)=>setPath(e)} updateData={(e)=>{setNewData(e)}}/>
              </motion.div>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}