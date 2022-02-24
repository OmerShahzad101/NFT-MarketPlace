import React, { useEffect, useState } from "react";
import liveAuction from "../../services/liveAuction.service";
import { ENV } from "../../env";
import { Link } from "react-router-dom";
import moment from "moment";
import $ from "jquery"
// --- Initial Data of Home Live Auction//
const initailData = {
  heading: "Live Auctions",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  btnText: "View All",
};

const AuctionsOne = () => {
  //--- Hook functions --- //
  const [initData] = useState(initailData);
  const [data, setData] = useState("");

  //  --- Fetch Data on component load ---
  useEffect(() => {
    $('html,body').animate({scrollTop: 0}, 'slow');
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await liveAuction.auction(
      `${ENV.API_URL}api/live-auction-nfts/`
    );
    setData(res.data.data.results);

    //__ __ JQuery for Live Auction Counter __ __ //
    const scriptCounter = document.createElement("script");
    scriptCounter.src = "/assets/js/vendor/countdown.min.js";
    scriptCounter.async = true;
    document.body.appendChild(scriptCounter);

    //__ __ JQuery for Live Auction Slider __ __ //
    const scriptSlider = document.createElement("script");
    scriptSlider.src = "/assets/js/main.js";
    scriptSlider.async = true;
    document.body.appendChild(scriptSlider);
  };

  return (
    <section className="live-auctions-area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="intro d-flex justify-content-between align-items-end m-0">
              <div className="intro-content">
                <span>{initData.pre_heading}</span>
                <h3 className="mt-3 mb-0">{initData.heading}</h3>
              </div>
              <div className="intro-btn">
                <Link className="btn content-btn" to="/liveAuction">
                  {initData.btnText}
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* --- Condition When Slides are less then 4 --- */}
        {data.length > 4 ? (
          <div className="auctions-slides">
            <div className="swiper-container slider-mid items">
              <div className="swiper-wrapper">
                {/* --- Iteration to show data --- */}
                {data ? (
                  data.map((item, idx) => {
                    return (
                      <div key={`auc_${idx}`} className="swiper-slide item">
                        <div className="card">
                          <div className="image-over">
                            <Link to={`/nft-details?${item.id}`}>
                              <img
                                className="card-img-top image-container-nft"
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
                                  data-date={moment(item.expiry_date).format(
                                    "YYYY-MM-DD"
                                  )}
                                />
                              </div>
                              <Link to={`/nft-details?${item.id}`}>
                                <h5 className="mb-0">{item.name}</h5>
                              </Link>
                              <Link
                                className="seller d-flex align-items-center my-3"
                                to={`/author?${item.user_id}`}
                              >
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
                ) : (
                  <div className="no_data">
                    <span>No NFT is on Auction</span>
                  </div>
                )}
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
        ) : (
          // --- Else When more then four Slides ---
          <div className="row items">
            {data ? (
              data.map((item, idx) => {
                return (
                  <div
                    key={`auc_${idx}`}
                    className="col-12 col-sm-6 col-lg-3 item"
                  >
                    <div className="card">
                      <div className="image-over">
                        <Link to={`/nft-details?${item.id}`}>
                          <img
                            className="card-img-top image-container-nft"
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
                              data-date={moment(item.expiry_date).format(
                                "YYYY-MM-DD"
                              )}
                            />
                          </div>
                          <Link to={`/nft-details?${item.id}`}>
                            <h5 className="mb-0">{item.name}</h5>
                          </Link>
                          <Link
                            className="seller d-flex align-items-center my-3"
                            to={`/author?${item.user_id}`}
                          >
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
            ) : (
              <div className="no_data">
                <span>No NFT is on Auction</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AuctionsOne;
