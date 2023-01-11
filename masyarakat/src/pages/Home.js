import React from "react"
import Navbar from "../components/Navbar"
import { base_url, product_image_url } from "../Config.js";
import $ from "jquery"
import axios from "axios"

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            adminName: null,
            admins: [],
            action: "",
            nik: "",
            status: 0,
            image: "",
            uploadFile: true,
            id_petugas: "",
            id_pengaduan:0,
            pelapor:"",
            isi_laporan:"",
            id_nik:"",
            id_tanggapan:"",
            tanggapan:""

        }
        this.handleChange = this.handleChange.bind(this);
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }


    handleChange(event) {
        this.setState({status: event.target.value});
      }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
   
    
    getAdmin = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        this.setState({adminName: admin.nama})
        this.setState({id: admin.id})
        this.setState({id_nik: admin.nik})
        this.setState({id_tanggapan:admin.id_tanggapan})
    }

    getPengaduan = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        let url = base_url + "/product/get/"+ admin.nik
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({admins: response.data})
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
   
    getTanggapan = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        let url= base_url+ "/tanggapan/get" + admin.id_tanggapan
        axios.get(url, this.headerConfig())
    
    }
   
    componentDidMount(){
        this.getPengaduan()
         this.getAdmin()
         this.getTanggapan()
   
    }
    drop = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/product/" + selectedItem.id_pengaduan
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPengaduan()
            })
            .catch(error => console.log(error))
            let ur = base_url + "/tanggapan/adu/" + selectedItem.id_pengaduan
            axios.delete(ur, this.headerConfig())
            .then(response => {
                
                this.getPengaduan()
            })
            .catch(error => console.log(error))
        }
    }


    Edit = selectedItem => {
        $("#modal_product").modal("show")
        this.setState({
            action: "update",
            nik: selectedItem.nik,
            id_pengaduan: selectedItem.id_pengaduan,
            pelapor: selectedItem.pelapor,
            isi_laporan:selectedItem.isi_laporan,
            // status: selectedItem.status,
            image: null,
            uploadFile: false
        })
    }
    Add = () => {
        $("#modal_product").modal("show")
        this.setState({
            action: "insert",
            product_id: 0,
            id_pengaduan: "",
            pelapor: "",
            isi_laporan:"",
            // status: "",
            image: null,
            uploadFile: true
        })
    }
    update = event => {
        event.preventDefault()
        let admin = JSON.parse(localStorage.getItem('admin'))
        let form = new FormData()
        form.append("nik",admin.nik)
        form.append("id_pengaduan", this.state.id_pengaduan)
        // form.append("status", this.state.status)
        form.append("isi_laporan", this.state.isi_laporan)
        form.append("pelapor", this.state.adminName)
        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }

        let url = base_url + "/product"
      
      
       
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPengaduan()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPengaduan()
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        return (
            <div>
                <Navbar />
                <div className="container">
                    <br></br>
                    <center><h3 className="text-bold text-primary mt-2">Laporan</h3></center>
                    <br/>
                    <table className="table  table border-dark">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Pelapor</th>
                                <th>Laporan</th>
                                <th>Gambar</th>
                                <th>Tanggal Laporan</th>
                                <th>Status</th>
                                <th>Aksi</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.admins.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.pelapor}</td>
                                    <td>{item.isi_laporan}</td>
                                    <td><img src={product_image_url + "/" + item.image} className="img"
                                        height="150" width="150" alt="cant open"></img></td>
                                    <td>{item.createdAt}</td>
                                    
                                    <td>{item.status}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary m-1"
                                        onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                       onClick={() => this.drop(item)}>
                                            Hapus
                                        </button>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button className="btn btn-success" onClick={() => this.Add()}>
                       Buat Pengaduan
                    </button>
                

                      {/* modal product  */}
                 <div className="modal fade" id="modal_product">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header bg-primary text-white">
                                 <h4>Form</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.update(ev)}>
                                     
                                    

                                    Laporan
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.isi_laporan}
                                     onChange={ev => this.setState({isi_laporan: ev.target.value})}
                                     required
                                     />

                                    { this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-dark mb-1 btn-block"
                                        onClick={() => this.setState({uploadFile: true})}>
                                            Change Image
                                        </button>
                                    ) : (
                                        <div>
                                             Image
                                            <input type="file" className="form-control mb-1"
                                            onChange={ev => this.setState({image: ev.target.files[0]})}
                                            
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