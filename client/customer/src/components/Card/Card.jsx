import { useSelector, useDispatch } from "react-redux"
import { fetchDoctors } from "../../store/actionCreator/doctors";
import React from "react";
import {Link} from "react-router-dom"
import "./Card.css"
import { useEffect } from "react";

const Card = () => {
  const { doctors, loadingDoctors, errorDoctors } = useSelector((state) => state.doctors)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  return (
    <div>
      <ul className="cards">
        {
          doctors.map((el, index) => {
            return (
              <li>
                <a  className="card">
                <Link to={`/doctors/${el.Profile.id}`}>

                  <img
                    src={el.Profile.photoProfile}
                    className="card__image"
                    alt=""
                    />
                  <div className="card__overlay">
                    <div className="card__header">
                      <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                        <path />
                      </svg>
                      {/* <div className="card__thumb">
                        <img
                        src={el.Profile.photoProfile}
                        alt=""
                        />
                      </div> */}
                      <div className="card__header-text">
                        <h3 className="card__title">{el.Profile.fullName}</h3>
                        <span className="card__status"></span>
                      </div>
                    </div>
                    <p className="card__description">
                      {el.Profile.address}
                    </p>

                  </div>
                  </Link>
                </a>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default Card;
