import React from "react"
 
export default class MasyarakatList extends React.Component{
    render(){
        return (
            <div className="card col-sm-12 my-1">
                <div className="card-body row">
                    <div className="col-sm-7">
                        {/* description */}
                        <h6>NIK: {this.props.nik}</h6>
                        <h6>Nama Masyarakat: {this.props.nama}</h6>
                        <h6>Username: {this.props.username}</h6>
                        <h6>Password: {this.props.password}</h6>
                    </div>
                    <div className="col-sm-2">
                        {/* action */}
                        <button className="btn btn-sm btn-primary btn-block"
                        onClick={this.props.onEdit}>
                            Edit
                        </button>
 
                        <button className="btn btn-sm btn-danger btn-block"
                        onClick={this.props.onDrop}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}