import React, { useEffect, useState } from "react";
import liveAuction from "../../services/liveAuction.service";
import { ENV } from "../../env";
import { Link } from "react-router-dom";
import moment from "moment";

const initailData = {
  heading: "Live Auctions",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  btnText: "Load More",
};

const AuctionsOne = () => {
  const [initData, setInitData] = useState(initailData);
  const [data, setData] = useState("");

  useEffect(async () => {
    const res = await liveAuction.auction(
      `${ENV.API_URL}api/live-auction-nfts/`
    );
    console.log(res);
    setData(res.data);
  }, []);

  return (
    <section className="live-auctions-area">
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
                <a className="btn content-btn" href="/auctions">
                  {initData.btnText}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="auctions-slides">
          <div className="swiper-container slider-mid items">
            <div className="swiper-wrapper">
              {/* Single Slide */}
              {data
                ? data.map((item, idx) => {
                    return (
                      <div key={`auc_${idx}`} className="swiper-slide item">
                        <div className="card">
                          <div className="image-over">
                            <Link to={`/nft-details?${item.id}`}>
                              <img
                                className="card-img-top"
                                src={`${ENV.API_URL_image}${item.image}`}
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="card-caption col-12 p-0">
                            <div className="card-body">
                              <div className="countdown-times mb-3">
                                {moment(item.expiry_date).format("YYYY-MM-DD")}

                                <div
                                  className="countdown d-flex justify-content-center"
                                  data-date={moment(item.expiry_date).format(
                                    "YYYY-MM-DD"
                                  )}
                                />
                              </div>
                              <Link to={`/nft-details?${item.id}`}>
                                <h5 className="mb-0">{item.name}</h5>
                              </Link>
                              <a
                                className="seller d-flex align-items-center my-3"
                                href="/item-details"
                              >
                                <img
                                  className="avatar-sm rounded-circle"
                                  src={`${ENV.API_URL_image}${item.profile_image}`}
                                  alt=""
                                />
                                <span className="ml-2">@{item.owner}</span>
                              </a>
                              <div className="card-bottom d-flex justify-content-between">
                                <span>${item.price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : " "}
            </div>
            <div className="swiper-pagination" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuctionsOne;
