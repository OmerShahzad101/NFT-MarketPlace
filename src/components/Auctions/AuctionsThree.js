import React, { useEffect, useState } from "react";
import liveAuction from "../../services/liveAuction.service";
import { ENV } from "../../env";
import { Link } from "react-router-dom";

const initailData = {
  heading: "Live Auctions",
  // content:
  //   "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  // btnText: "Load More",
};

const AuctionThree = () => {
  const [initData, setInitData] = useState(initailData);
  const [data, setData] = useState("");

  useEffect(async () => {
    const res = await liveAuction.auction(
      `${ENV.API_URL}api/live-auction-nfts/`
    );
    console.log(res);
    setData(res.data.data);


    
    const script = document.createElement("script");
    script.src = "/assets/js/vendor/countdown.min.js";
    script.async = true;
    document.body.appendChild(script);

    const scriptSlider = document.createElement("script");
    scriptSlider.src = "/assets/js/main.js";
    scriptSlider.async = true;
    document.body.appendChild(scriptSlider);
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
                                <div
                                  className="countdown d-flex justify-content-center"
                                  data-date="2022-5-25"
                                />
                              </div>
                              <Link to={`/nft-details?${item.id}`}>
                                <h5 className="mb-0">{item.name}</h5>
                              </Link>
                              <Link
                                className="seller d-flex align-items-center my-3"
                                to={`/nft-details?${item.id}`}>
                                <img
                                  className="avatar-sm rounded-circle"
                                  src={`${ENV.API_URL_image}${item.profile_image}`}
                                  alt=""
                                />
                                <span className="ml-2">@{item.owner}</span>
                              </Link>
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

export default AuctionThree;
