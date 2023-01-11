import React from "react"
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login"

import register from "./pages/Register"
import tanggapan from "./pages/Tanggapan"
import Home from "./pages/Home"


export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/tanggapan" component={tanggapan} />
        <Route path="/register" component={register} />
       
      </Switch>
    )
  }
}