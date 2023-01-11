import React from "react"
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login"
import Printadu from "./pages/printpengaduan"
import PrintT from "./pages/printtanggapan"
import register from "./pages/Register"
import Tanggapan from "./pages/tanggapan"
import Home from "./pages/Home"
import Masyarakat from "./pages/Masyarakat"


export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={register} />
        <Route path="/tanggapan" component={Tanggapan} />
        <Route path="/printadu" component={Printadu} />
        <Route path="/masyarakat" component={Masyarakat} />
        <Route path="/printt" component={PrintT} />
      </Switch>
    )
  }
}