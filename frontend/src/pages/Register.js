import React from "react"
import axios from "axios"
import { base_url } from "../Config.js";


export default class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            name: "",
            telepon: "",
            level: "",
            message: "",
            logged: true
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({level: event.target.value});
      }
    
            saveAdmin = event => {
                event.preventDefault()
                let form = {
                    name: this.state.name,
                    username: this.state.username,
                    level: this.state.level,
                    telepon: this.state.telepon,
                    password :  this.state.password
                
                }
                
                

                let url = base_url + "/admin"
               
                    axios.post(url,form)
                    .then(response => {
                        window.alert(response.data.message)
                        this.props.history.push("/login")
                    })
                    .catch(error => console.log(error))
                
            }
        
        
     
    

    render(){
        return(
            <div className="container d-flex h-100 justify-content-center align-items-center">
                <div className="col-sm-6 card my-5">
                    <div className="card-header bg-dark text-white text-center">
                        <h4>Pengaduan</h4>
                        <strong className="text-warning">Register</strong>
                    </div>
                    <div className="card-body">
                        { !this.state.logged ? 
                        (
                            <div className="alert alert-danger mt-1">
                                { this.state.message }
                            </div>
                        ) : null }
                        
                      <form onSubmit={ev => this.saveAdmin(ev)}>
                            <input type="text" className="form-control mb-1" value={this.state.name}
                            onChange={ev => this.setState({name: ev.target.value})} placeholder="nama" required/>
                            <input type="text" className="form-control mb-1" value={this.state.username}
                            onChange={ev => this.setState({username: ev.target.value})} placeholder="username" required/>
                            <input type="password" className="form-control mb-1" value={this.state.password}
                            onChange={ev => this.setState({password: ev.target.value})}
                            autoComplete="false" placeholder="password" required/>
                            <input type="text" className="form-control mb-1" value={this.state.telepon}
                            onChange={ev => this.setState({telepon: ev.target.value})} placeholder="telepon" required/>
                                 
                                <select placeholder="status" className="form-control mb-1" value={this.state.level} onChange={this.handleChange}>
                                <option value="petugas">petugas</option>
                                <option value="admin">admin</option>

                                </select>
                              


                        


                            <button className="btn btn-block btn-success mb-1" type="submit">
                                Daftar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}