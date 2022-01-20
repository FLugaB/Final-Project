import { useSelector, useDispatch } from "react-redux"
import { fetchDoctors } from "../../store/actionCreator/doctors";
import React from "react";
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
        <li>
          <a href="" className="card">
            <img
              src="https://i.imgur.com/oYiTqum.jpg"
              className="card__image"
              alt=""
            />
            <div className="card__overlay">
              <div className="card__header">
                <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                  <path />
                </svg>
                <img
                  className="card__thumb"
                  src="https://i.imgur.com/7D7I6dI.png"
                  alt=""
                />
                <div className="card__header-text">
                  <h3 className="card__title">Jessica Parker</h3>
                  <span className="card__status">1 hour ago</span>
                </div>
              </div>
              <p className="card__description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores, blanditiis?
              </p>
            </div>
          </a>
        </li>

        <li>
          <a href="" className="card">
            <img
              src="https://i.imgur.com/2DhmtJ4.jpg"
              className="card__image"
              alt=""
            />
            <div className="card__overlay">
              <div className="card__header">
                <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                  <path />
                </svg>
                <img
                  className="card__thumb"
                  src="https://i.imgur.com/sjLMNDM.png"
                  alt=""
                />
                <div className="card__header-text">
                  <h3 className="card__title">kim Cattrall</h3>
                  <span className="card__status">3 hours ago</span>
                </div>
              </div>
              <p className="card__description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores, blanditiis?
              </p>
            </div>
          </a>
        </li>

        <li>
          <a href="" className="card">
            <img
              src="https://i.imgur.com/oYiTqum.jpg"
              className="card__image"
              alt=""
            />
            <div className="card__overlay">
              <div className="card__header">
                <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                  <path />
                </svg>
                <img
                  className="card__thumb"
                  src="https://i.imgur.com/7D7I6dI.png"
                  alt=""
                />
                <div className="card__header-text">
                  <h3 className="card__title">Jessica Parker</h3>
                  <span className="card__tagline">
                    Lorem ipsum dolor sit amet consectetur
                  </span>
                  <span className="card__status">1 hour ago</span>
                </div>
              </div>
              <p className="card__description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores, blanditiis?
              </p>
            </div>
          </a>
        </li>

        <li>
          <a href="" className="card">
            <img
              src="https://i.imgur.com/2DhmtJ4.jpg"
              className="card__image"
              alt=""
            />
            <div className="card__overlay">
              <div className="card__header">
                <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                  <path />
                </svg>
                <img
                  className="card__thumb"
                  src="https://i.imgur.com/sjLMNDM.png"
                  alt=""
                />
                <div className="card__header-text">
                  <h3 className="card__title">kim Cattrall</h3>
                  <span className="card__status">3 hours ago</span>
                </div>
              </div>
              <p className="card__description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores, blanditiis?
              </p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Card;
