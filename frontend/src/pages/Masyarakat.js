import React from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { base_url } from "../Config"
import $ from "jquery"


export default class Masyarakat extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            action: "",
            masyarakat: [],
            nik: "",
            nama: "",
            username: "",
            password: "",
           
            fillPassword: true
        }
        if(localStorage.getItem("token")){
            this.state.token = localStorage.getItem("token")
        }else{
            window.location = "/login"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getMasyarakat = () => {
        let url = base_url + "/masyarakat"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({masyarakat: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    componentDidMount(){
        this.getMasyarakat()
    }

    Add = () => {
        $("#modal_masyarakat").modal("show")
        this.setState({
            action: "insert",
            nik: "",
            nama: "",
            username: "",
            password: "",
          
            fillPassword: true,
        })
    }
    Edit = selectedItem => {
        $("#modal_masyarakat").modal("show")
        this.setState({
            action: "update",
            nik: selectedItem.nik,
            nama: selectedItem.nama,
            username: selectedItem.username,
            password: "",
            fillPassword: false,
        })
    }
    saveMasyarakat = event => {
        event.preventDefault()
        $("#modal_masyarakat").modal("hide")
        let form = {
            nik: this.state.nik,
            nama: this.state.nama,
            username: this.state.username
    
        }

        if (this.state.fillPassword) {
            form.password =  this.state.password
        }

        let url = base_url + "/masyarakat"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMasyarakat()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMasyarakat()
            })
            .catch(error => console.log(error))
        }
    }
    dropMasyarakat = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/masyarakat/" + selectedItem.nik
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMasyarakat()
            })
            .catch(error => console.log(error))
        }
    }


    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <br/>
                    <center><h3 className="text-bold text-info ml-auto mt-2">List Masyarakat</h3></center> <br/>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>NIK</th>
                                <th>Nama</th>
                                <th>Username</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.masyarakat.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.nik}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.username}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                        onClick={() => this.dropMasyarakat(item)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                       Tambah Masyarakat
                    </button>
                    {/* modal masyarakat  */}
                    <div className="modal fade" id="modal_masyarakat">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Masyarakat</h4> 
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveMasyarakat(ev)}>
                                         NIK
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.nik}
                                        onChange={ev => this.setState({nik: ev.target.value})}
                                        required
                                        />
                                        Masyarakat Name
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.nama}
                                        onChange={ev => this.setState({nama: ev.target.value})}
                                        required
                                        />

                                        Username
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.username}
                                        onChange={ev => this.setState({username: ev.target.value})}
                                        required
                                        />


                                        { this.state.action === "update" && this.state.fillPassword === false ? (
                                            <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                            onClick={() => this.setState({fillPassword: true})}>
                                                Change Password
                                            </button>
                                        ) : (
                                            <div>
                                                Password
                                                <input type="password" className="form-control mb-1"
                                                value={this.state.password}
                                                onChange={ev => this.setState({password: ev.target.value})}
                                                required
                                                />
                                            </div>
                                        ) }

                                        <button type="submit" className="btn btn-block btn-success">
                                            Simpan
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}