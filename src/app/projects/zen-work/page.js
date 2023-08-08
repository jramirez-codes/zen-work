'use client'

import React from "react";
import { Provider } from "react-redux";
import store from './store/store'
import MainApp from "./pages/mainAppOld-v2";

export default function IndexPage() {
  const [isClient, setIsClient] = React.useState(true)

  React.useEffect(()=>{
    setIsClient(true)
  },[])

  return(
    isClient?(
      <Provider store={store}>
        <MainApp/>
      </Provider>
    ):null
  )
}