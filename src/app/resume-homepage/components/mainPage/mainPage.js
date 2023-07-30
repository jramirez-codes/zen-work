import React, {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import './mainPage.css'
import SideInfo from "./components/sideInfo/SideInfo";
import AboutMe from "./components/aboutMe/AboutMe";
import { motion } from "framer-motion";
import ContactMe from "./components/contactMe/contactMe";
// import Portfolio from "./components/portfolio/Portfolio";

export default function MainPage(props) {
  const [currPage, setCurrPage] = useState("About Me")
  useEffect(()=>{
    setCurrPage(props.currPage)
  },[props])

  const CurrPage = () => {
    if(currPage === 'About Me')
      return (
        <motion.div 
            style={{marginTop:"2vh", marginRight:'3vw', marginLeft:'3vw', marginBottom: '2vh'}}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              default: {
                duration: 0.1,
                ease: [0, 0.71, 0.2, 1.01]
              },
              scale: {
                type: "linear",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001
              }
            }}
          >
          <AboutMe/>
        </motion.div>
      )
    else if(currPage === 'Portfolio')
      return (
        <motion.div 
            style={{marginTop:"2vh", marginRight:'3vw', marginLeft:'3vw', marginBottom: '2vh'}}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              default: {
                duration: 0.1,
                ease: [0, 0.71, 0.2, 1.01]
              },
              scale: {
                type: "linear",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001
              }
            }}
          >
          {/* <Portfolio/> */}
        </motion.div>
      )
    return (
      <motion.div 
          style={{marginTop:"2vh", marginRight:'3vw', marginLeft:'3vw', marginBottom: '2vh'}}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            default: {
              duration: 0.1,
              ease: [0, 0.71, 0.2, 1.01]
            },
            scale: {
              type: "linear",
              damping: 5,
              stiffness: 100,
              restDelta: 0.001
            }
          }}
        >
        <ContactMe/>
      </motion.div>
    )
  }

  return(
    <>
      {/* <Grid container spacing={0}>
        <Grid item lg={3} md={4} sm={12} sx={12}>
          <SideInfo/>
        </Grid>
        <Grid item lg={9} md={8} sm={12} sx={12}>
          <CurrPage/>
        </Grid>
      </Grid> */}
      <Grid container spacing={0}>
        <Grid item lg={12} md={12} sm={12} sx={12}>
          <CurrPage/>
        </Grid>
      </Grid>
    </>
  )
}