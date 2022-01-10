import React, { Component, useEffect } from "react";
import axios from "axios";
import { useState } from "react/cjs/react.development";

const BASE_URL =
  "https://my-json-server.typicode.com/themeland/netstorm-json-1/author";

const AuthorProfile = (props) => {
  const [data, setData] = useState({});
  const [socialData, setSocialData] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}`)
      .then((res) => {
        setData(res.data);
        setSocialData(res.data.socialData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="card no-hover text-center">
      <div className="image-over">
        <img className="card-img-top" src={data.img} alt="" />
        {/* Author */}
        <div className="author">
          <div className="author-thumb avatar-lg">
            <img className="rounded-circle" src={data.authorImg} alt="" />
          </div>
        </div>
      </div>
      {/* Card Caption */}
      <div className="card-caption col-12 p-0">
        {/* Card Body */}
        <div className="card-body mt-4">
          {/* <h5 className="mb-3">{props.createNFT_data.name}</h5>
          <p className="my-3">{props.createNFT_data.description}</p> */}
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder={data.authorId}
            />
            <div className="input-group-append">
              <button>
                <i className="icon-docs" />
              </button>
            </div>
          </div>
          {/* Social Icons */}
          <div className="social-icons d-flex justify-content-center my-3">
            {socialData.map((item, idx) => {
              return (
                <a key={`asd_${idx}`} className={item.link} href="#">
                  <i className={item.icon} />
                  <i className={item.icon} />
                </a>
              );
            })}
          </div>
          <a className="btn btn-bordered-white btn-smaller" href="#">
            {data.btnText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
