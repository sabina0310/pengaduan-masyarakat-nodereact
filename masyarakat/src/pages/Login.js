import React from "react"
import axios from "axios"
import { base_url } from "../Config.js";

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            message: "",
            logged: true
        }

    }

    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password
        }

        let url = base_url + "/masyarakat/auth"
        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged) {
                
                let admin = response.data.data
                let token = response.data.token
               
                localStorage.setItem("admin", JSON.stringify(admin))
                localStorage.setItem("token", token)
                this.props.history.push("/")
                
            } else {
                this.setState({message: response.data.message})
                
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div className="container d-flex h-100 justify-content-center align-items-center">
                <div className="col-sm-6 card my-5">
                    <div className="card-header bg-dark text-white text-center">
                        <h4>Pengaduan</h4>
                        <strong className="text-warning">Masyarakat Sign In</strong>
                    </div>
                    <div className="card-body">
                        { !this.state.logged ? 
                        (
                            <div className="alert alert-danger mt-1">
                                { this.state.message }
                            </div>
                        ) : null }
                        
                      <form onSubmit={ev => this.Login(ev)}>
                            <input type="text" className="form-control mb-1" value={this.state.username}
                            onChange={ev => this.setState({username: ev.target.value})} placeholder="username"/>
                            <input type="password" className="form-control mb-1" value={this.state.password}
                            onChange={ev => this.setState({password: ev.target.value})} placeholder="password"
                            autoComplete="false"  />

                            <button className="btn btn-block btn-dark mb-1" type="submit">
                                Sign In
                            </button>
                        </form>
                    </div>
                    <center><a href="/register">Register</a>  </center>
                </div>
            </div>
        )
    }

}