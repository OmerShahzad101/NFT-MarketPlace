import React, { useEffect, useState } from "react";
import liveAuction from "../../services/liveAuction.service";
import { ENV } from "../../env";
import { Link } from "react-router-dom";
import moment from "moment";

const AuctionThree = () => {
  //__ __ Hook functions __ __ //
  const [data, setData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  // Fetch Data on component load
  const fetchData = async () => {
    const res = await liveAuction.auction(
      `${ENV.API_URL}api/live-auction-nfts/`
    );
    setData(res.data.data.results);

    //__ __ JQuery for Live Auction Counter __ __ //
    setTimeout(function () {
      const script = document.createElement("script");
      script.src = "/assets/js/vendor/countdown.min.js";
      script.async = true;
      document.body.appendChild(script);
    }, 1000);

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
                <h3 className="mt-3 mb-0">Live Auctions</h3>
              </div>
            </div>
          </div>
        </div>
        {/* Condition When Slides are less then 4 */}
        {data.length >= 4 ? (
          <div className="auctions-slides">
            <div className="swiper-container slider-mid items">
              <div className="swiper-wrapper">
                {/* __ __ Iteration to show data __ __ */}
                {data ? (
                  data.map((item, idx) => {
                    return (
                      <div key={`auc_${idx}`} className="swiper-slide item">
                        <div className="card">
                          <div className="image-over">
                            <a href={`/nft-details?${item.id}`}>
                              <img
                                className="card-img-top image-container-nft"
                                src={`${ENV.API_URL_image}${item.image}`}
                                alt=""
                              />
                            </a>
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
                              <a href={`/nft-details?${item.id}`}>
                                <h5 className="mb-0">{item.name}</h5>
                              </a>
                              <Link
                                className="seller d-flex align-items-center my-3"
                                to={`/author?${item.user_id}`}
                              >
                                <img
                                  className="avatar-sm rounded-circle"
                                  src={`${ENV.API_URL_image}${item.profile_image}`}
                                  alt="Profile"
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
          // __ __ Else When more then four Slides __ __}
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
                        <a href={`/nft-details?${item.id}`}>
                          <img
                            className="card-img-top image-container-nft"
                            src={`${ENV.API_URL_image}${item.image}`}
                            alt=""
                          />
                        </a>
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
                          <a href={`/nft-details?${item.id}`}>
                            <h5 className="mb-0">{item.name}</h5>
                          </a>
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

export default AuctionThree;
