import React, { useEffect } from "react";
import "./ConsultationRequest.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchConsultationTickets } from "../../store/actionCreator/consultationRequests.js";
import { fetchDoctorDetail } from "../../store/actionCreator/doctors.js";
import { useNavigate } from "react-router-dom";
import { SiGooglemeet } from "react-icons/si";

const ConsultationRequest = () => {
  const {
    consultationRequests,
    loadingConsultationRequests,
    errorConsultationRequests,
  } = useSelector((state) => state.consultationRequests);
  const { profile, loading, error } = useSelector(
    (state) => state.userRole
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleButtonConsultation = async () => {
    const str = profile.fullName.replace(".", "").replace(/\s+/g, "");
    navigate(`/video-owner/${str}`)
  }

  useEffect(() => {
    dispatch(fetchConsultationTickets());
  }, [dispatch])

  console.log(consultationRequests, "stateCheck");
  
  return (
    <div>
      <table className="container">
        <thead>
          <tr>
            <th>
              <h1>#ID</h1>
            </th>
            <th>
              <h1>Voucher Token</h1>
            </th>
            <th>
              <h1>Status</h1>
            </th>
            <th>
              <h1>Action</h1>
            </th>
          </tr>
        </thead>
        <tbody>
        {
          consultationRequests.map((el) => {
            return (
              <tr key={el.id}>
                <td>{el.id}</td>
                <td>{el.voucherToken}</td>
                <td>{el.status}</td>
                <td><SiGooglemeet style={{fontSize: 30}} onClick={handleButtonConsultation}/></td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  );
};

export default ConsultationRequest;
