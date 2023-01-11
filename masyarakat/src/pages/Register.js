import React from "react"
import axios from "axios"
import { base_url } from "../Config.js";


export default class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            nama: "",
            nik:"",
            message: "",
            logged: true
        }

    }
    
   
    
            saveAdmin = event => {
                event.preventDefault()
                let form = {
                    nama: this.state.nama,
                    username: this.state.username,
                    nik: this.state.nik,
                    
                    password :  this.state.password
                
                }
                
                
        
                let url = base_url + "/masyarakat"
               
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
                            <input type="text" className="form-control mb-1" value={this.state.nama}
                            onChange={ev => this.setState({nama: ev.target.value})} placeholder="nama" required/>
                            <input type="text" className="form-control mb-1" value={this.state.username}
                            onChange={ev => this.setState({username: ev.target.value})} placeholder="username" required/>
                            <input type="password" className="form-control mb-1" value={this.state.password}
                            onChange={ev => this.setState({password: ev.target.value})}
                            autoComplete="false" placeholder="password" required/>
                            <input type="text" className="form-control mb-1" value={this.state.nik}
                            onChange={ev => this.setState({nik: ev.target.value})} placeholder="nik" required/>
                          
                             
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