import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { ENV } from "../../env";
import topSellers from "../../services/topSellers.service";
import $ from "jquery";

const TopSeller = () => {
  const initData = {
    preHeading: "Creative Artists",
    heading: "Top Sellers",
  };
  const [data, setData] = useState({});
  const [sellerData, setSellerData] = useState();

  useEffect(async () => {
    const result = await topSellers.topSellersList(
      `${ENV.API_URL}api/top_sellers/`
    );
    setSellerData(result.data.data.top_sellers);
    console.log(result.data.data.top_sellers);
    loadMore();
  }, []);
  const loadMore = () => {
    $(".load-more .item").slice(0, 6).show();

    $("#load-btn").on("click", function (e) {
      e.preventDefault();
      $(".load-more .item:hidden").slice(0, 6).slideDown();
      if ($(".load-more .item:hidden").length == 0) {
        $("#load-btn").fadeOut("slow");
      }
    });
  }
  return (
    <section className="top-seller-area p-0">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Intro */}
            <div className="intro d-flex justify-content-between align-items-end m-0">
              <div className="intro-content">
                <span>{initData.pre_heading}</span>
                <h3 className="mt-3 mb-0">{initData.heading}</h3>
              </div>
              <div className="intro-btn">
                <a className="btn content-btn" href="/marketplace">
                  View All
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row items load-more">
          {sellerData
            ? sellerData.map((item, idx) => {
                return (
                  <div
                    key={`ts_${idx}`}
                    className="col-12 col-sm-6 col-lg-4 item"
                  >
                    {/* Single Seller */}
                    <div className="card no-hover">
                      <div className="single-seller d-flex align-items-center">
                        <Link to={`/author?${item.user_id}`}>
                          <img
                            className="avatar-md rounded-circle"
                            src={`${ENV.API_URL_image_media}${item.profile_image}`}
                            alt=""
                          />
                        </Link>
                        {/* Seller Info */}
                        <div className="seller-info ml-3">
                          <Link
                            className="seller mb-2"
                            to={`/author?${item.user_id}`}
                          >
                            {item.user_name}
                          </Link>
                          <span>${item.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
        {/* <div className="row">
          <div className="col-12 text-center">
            <a id="load-btn-topSellers" className="btn btn-bordered-white mt-5" href="#">
              Load More
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TopSeller;
