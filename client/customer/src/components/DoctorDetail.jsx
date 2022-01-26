import { useState, useEffect } from 'react';
import { useParams , Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './doctorDetail.css'
import {fetchDoctorDetail} from "../store/actionCreator/doctors.js"


const DoctorDetail = () => {

    const params = useParams()

    const [localLoad, setLocalLoad] = useState(true)
    // const { } = useSelector( (state) => state.doctor)

    const dispatch = useDispatch();
    const data = useSelector(state => state.doctors.doctorDetail)
    const {id} = useParams()
    console.log("ini", id);
    useEffect(() => {
        if (data) {
            return
        }
        dispatch(fetchDoctorDetail(id))
    },[id]);
    // useEffect(() => pageLoaded(), [beforeUpdateProduct.id])




    return (
    <div>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <Link type="button" to="/" class="btn btn-warning" style={{marginTop: 30, marginLeft: 30}}>Back</Link>
        <div className="container emp-profile">
            <div className="row">
                <div className="col-md-4">
                    <div className="profile-img">
                        <img src={data && data.Profile.photoProfile} alt=""/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="profile-head">
                        <h5>
                            {data && data.Profile.fullName}
                        </h5>
                        <h6>
                            {data && data.role}
                        </h6>
                        <ul className="nav nav-tabs" id="myTab" role="tablist" style={{display:"inline"}}>
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                            </li>
                            <li className="nav-item">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Name</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{data && data.Profile.fullName}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Email</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{data && data.email}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Phone</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{data && data.Profile.phoneNumber}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Address</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{data && data.Profile.address}</p>
                                    </div>
                                </div>
                            </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    );
};
export default DoctorDetail;
