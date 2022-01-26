import React, { useEffect, useState } from "react";
import "./ConsultationRequest.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchConsultationTickets,
  patchConsultationTickets,
} from "../../store/actionCreator/consultationRequests.js";
import { fetchDoctorDetail } from "../../store/actionCreator/doctors.js";
import { useNavigate } from "react-router-dom";
import { SiGooglemeet } from "react-icons/si";

const ConsultationRequest = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    consultationRequests,
    loadingConsultationRequests,
    errorConsultationRequests,
  } = useSelector((state) => state.consultationRequests);
  const { profile, loading, error } = useSelector((state) => state.userRole);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleButtonConsultation = async (id) => {
    console.log(id, "id");
    await dispatch(patchConsultationTickets(id));
    const str = profile.fullName.replace(".", "").replace(/\s+/g, "");
    navigate(`/video-owner/${str}`);
  };

  useEffect(() => {
    dispatch(fetchConsultationTickets());
  }, [consultationRequests]);

  useEffect(() => {
    if (consultationRequests.length >= 1) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [consultationRequests]);

  return (
    <div className="inner-scroll ">
      {!isLoading && consultationRequests.text === "There is No Ticket yet.." && (
        <div className="titleStyle">
          <h2>You don't have a counsultation reuqest yet...</h2>
        </div>
      )}

      {!isLoading && consultationRequests.length >= 1 && (
        <table className="containerTable1">
          <thead>
            <tr>
              {/* <th>
                <h1>#ID</h1>
              </th> */}
              <th>
                <h1>#Client Id</h1>
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
            {consultationRequests.map((el) => {
              return (
                <tr key={el.id}>
                  {/* <td>{el.id}</td> */}
                  <td className="text-center">{el.ClientId}</td>
                  <td className="text-center">{el.status}</td>
                  <td className="text-center">
                    <SiGooglemeet
                      style={{ fontSize: 30 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleButtonConsultation(el.id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConsultationRequest;
