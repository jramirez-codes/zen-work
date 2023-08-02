import React from "react";
import { Provider } from "react-redux";
import store from '../store/store'
import MainApp from "./mainApp";

export default function IndexPage() {
  return(
    <Provider store={store}>
      <MainApp/>
    </Provider>
  )
}