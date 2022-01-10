import React, { Component } from "react";

import { useEffect, useState } from "react/cjs/react.development";
import { ENV } from "../../env";
import authors from "../../services/authors.service";



const Authors = () => {
  const [data, setData] = useState({});
  const [authorData, setAuthorData] = useState([]);

  useEffect(async () => {

    const result = await authors.authorsList(`${ENV.API_URL}api/profile/get-list/`);
    setAuthorData(result.data);
    console.log(result);
  },[]);

  return (
    <section className="popular-collections-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            {/* Intro */}
            <div className="intro text-center">
              <span>{data.preHeading}</span>
              <h3 className="mt-3 mb-0">{data.heading}</h3>
              <p>{data.content}</p>
            </div>
          </div>
        </div>
        <div className="row items">
          {authorData.map((item, idx) => {
            return (
              <div key={`ad_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                <div className="card no-hover text-center">
                  <div className="image-over">
                    <a href="/author">
                      <img className="card-img-top" src={item.img} alt="" />
                    </a>
                    {/* Seller */}
                    <a className="seller" href="/author">
                      <div className="seller-thumb avatar-lg">
                        <img
                          className="rounded-circle"
                          src={item.avatar}
                          alt=""
                        />
                      </div>
                    </a>
                  </div>
                  {/* Card Caption */}
                  <div className="card-caption col-12 p-0">
                    {/* Card Body */}
                    <div className="card-body mt-4">
                      <a href="/author">
                        <h5>{item.author}</h5>
                      </a>
                      <a
                        className="btn btn-bordered-white btn-smaller"
                        href="#"
                      >
                        {item.btnText}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Authors;
