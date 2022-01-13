import React, { Component } from "react";

import { useEffect, useState } from "react/cjs/react.development";
import { ENV } from "../../env";
import authors from "../../services/authors.service";



const Authors = () => {
  const [data, setData] = useState({});
  const [authorData, setAuthorData] = useState([]);

  useEffect(async () => {

    const result = await authors.authorsList(`${ENV.API_URL}api/profile/get-list/`);
    // const result = await authors.authorsList("http://192.168.99.229:8000/api/profile/get-list/");
    setAuthorData(result.data);
    console.log(result.data);
    
  },[]);

  return (
    <section className="popular-collections-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            {/* Intro */}
            <div className="intro text-center">
              <span>Authors</span>
              <h3 className="mt-3 mb-0">Our Creators</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</p>
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
                      {/* <img className="card-img-top image-container" src={`http://192.168.99.229:8000${item.banner_image}`} alt="" /> */}
                      <img className="card-img-top" src={`${ENV.API_URL_image}${item.banner_image}`} alt="" />
                    </a>
                    {/* Seller */}
                    <a className="seller" href="/author">
                      <div className="seller-thumb avatar-lg">
                        <img
                          className="rounded-circle"
                          // src={`http://192.168.99.229:8000${item.profile_image}`}
                          src={`${ENV.API_URL_image}${item.profile_image}`}
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
                        <h5>{item.user.first_name} {item.user.last_name}</h5>
                      </a>
                      <p>{item.about}</p>
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
