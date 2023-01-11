import React from "react"

import { base_url, product_image_url } from "../Config.js";

import axios from "axios"
import Pdf from "react-to-pdf";
const ref = React.createRef();
const options = {
    orientation: 'landscape',
    
};
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
            tangggapan:"",
            id_pengaduan:0,
            pelapor:"",
            isi_laporan:""
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
   
    
    getAdmin = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        this.setState({adminName: admin.name})
        this.setState({id_petugas: admin.id_petugas})
    }

    getPengaduan = () => {
        let url = base_url + "/tanggapan/detail"
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
   
  

   
    componentDidMount(){
        this.getPengaduan()
         this.getAdmin()
    }
 


    render(){
        return (
            <div>
            
                <div className="container">
                    <br/>
                    <br/>
                    <br/>
                <Pdf targetRef={ref} filename="cetak-tanggapan.pdf" options={options} >
        {({ toPdf }) => <button  className="btn btn-sm btn-success m-1" onClick={toPdf}>Download PDF</button>}
      </Pdf>
                <div ref={ref}>
                    <center><h3 className="text-bold text-info mt-2">List Tanggapan</h3></center>
                    <br/>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>NIK Pelapor</th>
                                <th>Isi Pengaduan</th>
                                <th>Gambar</th>
                                <th>Tanggapan</th>
                                <th>Tgl Tanggapan</th>
                                
                                
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.admins.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.pengaduan.nik}</td>
                                    <td>{item.pengaduan.isi_laporan}</td>
                                    <td><img src={product_image_url + "/" + item.pengaduan.image} className="img"
                                        height="150" width="150" alt="cant open"></img></td>
                                    <td>{item.tanggapan}</td>
                                     <td>{item.createdAt}</td>
                                    
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
</div>
                    
                

            </div>
              </div>
        )
    }

}