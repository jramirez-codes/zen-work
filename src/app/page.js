"use client"

import React from "react"
import { Grid, Paper } from "@mui/material"
import './mainPage.css'

export default function Home() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
        <Paper elevation={5} sx={{padding:'2%', minWidth:'400px', borderRadius:5}}>
          <h1>Jordan Ramirez</h1>
          <h2>Full Stack Developer</h2>
        </Paper>
      </Grid>
    </Grid>
  )
}
