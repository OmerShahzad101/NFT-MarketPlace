import React, { useEffect, useState } from "react";
import liveAuction from "../../services/liveAuction.service";

import { ENV } from "../../env";
import { Link } from "react-router-dom";
import moment from "moment";
import $ from "jquery";

//__ Live Auction Page __ //
let limit = 8;
// __ __ Initial Data __ __ //
const InitialData = {
  heading: "Live Auctions",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  btnText: "Load More",
};

const AuctionsTwo = () => {
  // __ __ Hook Function __ __ //
  const [initData] = useState(InitialData);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    $("html,body").animate({ scrollTop: 0 }, "slow");
    setLoader(true);
    pagination();
  }, []);

  const pagination = async () => {
    const res = await liveAuction.auction(
      `${ENV.API_URL}api/live-auction-nfts/?page=${page}&limit=${limit}`
    );
    let newArr = [...data, ...res.data.data.results];
    setData(newArr);
    //__ __ Reload JQuery Script __ __ //
    const script = document.createElement("script");
    script.src = "/assets/js/vendor/countdown.min.js";
    script.async = true;
    document.body.appendChild(script);

    if (res.data.data.count === newArr.length) {
      $("#loadmorebtn").fadeOut("slow");
    }
    setLoader(false);
    setPage(page + 1);
  };
  return (
    <>
      {loader ? (
        <div className="fullpage-loader-holder height">
          <div className="fullpage-loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
          </div>
          <body></body>

        </div>
      ) : (
        <section className="live-auctions-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-7">
                <div className="intro text-center">
                  <h3 className="mt-3 mb-0">{initData.heading}</h3>
                  <p>{initData.content}</p>
                </div>
              </div>
            </div>
            <div className="row items">
              {/* __ __ Iteration to Display Data __  */}
              {data ? (
                data.map((item, idx) => {
                  return (
                    <div
                      key={`auct_${idx}`}
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
            <div className="row">
              <div className="col-12 text-center">
                <button
                  onClick={() => pagination()}
                  className="btn btn-bordered-white mt-5"
                  id="loadmorebtn"
                >
                  Load More
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default AuctionsTwo;
