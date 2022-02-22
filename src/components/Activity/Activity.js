import React, { useEffect, useState } from "react";
import activity from "../../services/activity.service";
import { ENV } from "../../env";
import moment from "moment";
import { Link } from "react-router-dom";
import $ from "jquery";
const Activity = () => {
  //__ __Hook Function __ __ //
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);


  useEffect(() => {
    // __ Function call to fetch data __ //
    setLoader(true)
    $("html,body").animate({ scrollTop: 0 }, "slow");
    fetchData();
  }, []);
  // __ __ API Call to Fetch all bidding list __ __ //
  const fetchData = async () => {
    const res = await activity.activityGet(`${ENV.API_URL}api/bidding/`);
    setData(res.data.data.results);
    setLoader(false)

  };

  return (
    <>
      {loader ? (
        <div className="fullpage-loader-holder ">
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
        <section className="activity-area load-more">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="intro mb-4">
                  <div className="intro-content">
                    <span>CREATIVE</span>
                    <h3 className="mt-3 mb-0">Activity</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="row items">
              <div className="col-12 col-md-6 col-lg-8">
                <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
                  <li>
                    <a
                      className="active"
                      id="nav-home-tab"
                      data-toggle="pill"
                      href="#nav-home"
                    >
                      <h5 className="m-0">ALL</h5>
                    </a>
                  </li>
                  <li>
                    <a
                      id="nav-profile-tab"
                      data-toggle="pill"
                      href="#nav-profile"
                    >
                      <h5 className="m-0">Recent</h5>
                    </a>
                  </li>
                  <li>
                    <a
                      id="nav-contact-tab"
                      data-toggle="pill"
                      href="#nav-contact"
                    >
                      <h5 className="m-0">Bids</h5>
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="nav-tabContent">
                  <div className="tab-pane fade show active" id="nav-home">
                    <ul className="list-unstyled">
                      {data ? (
                        data.map((item, idx) => {
                          return (
                            <li
                              key={`ato_${idx}`}
                              className="single-tab-list d-flex align-items-center"
                            >
                              <Link to={`/nft-details?${item.nft_id}`}>
                                <img
                                  className="avatar-lg"
                                  src={`${ENV.API_URL_image_media}${item.nft_image}`}
                                  alt=""
                                />
                              </Link>
                              <div className="activity-content display-inline ml-4">
                                <Link to={`/nft-details?${item.nft_id}`}>
                                  <h5 className="mt-0 mb-2">{item.nft}</h5>
                                </Link>
                                <p className="m-0">
                                  Bid listed for <strong>${item.price}</strong>{" "}
                                  {moment(item.bidding_date).fromNow()}
                                  {item.time} by{" "}
                                  <Link to={`/author?${item.user_id}`}>
                                    @{item.offer_by}
                                  </Link>
                                </p>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <div className="no_data_history">
                          <span>No Bidding List</span>
                        </div>
                      )}
                    </ul>
                  </div>
                  <div className="tab-pane fade" id="nav-profile">
                    <ul className="list-unstyled">
                      {data ? (
                        data.map((item, idx) => {
                          return (
                            <li
                              key={`ato_${idx}`}
                              className="single-tab-list d-flex align-items-center"
                            >
                              <Link to={`/nft-details?${item.nft_id}`}>
                                <img
                                  className="avatar-lg"
                                  src={`${ENV.API_URL_image_media}${item.nft_image}`}
                                  alt=""
                                />
                              </Link>
                              <div className="activity-content display-inline ml-4">
                                <Link to={`/nft-details?${item.nft_id}`}>
                                  <h5 className="mt-0 mb-2">{item.nft}</h5>
                                </Link>
                                <p className="m-0">
                                  Bid listed for <strong>${item.price}</strong>{" "}
                                  {moment(item.bidding_date).fromNow()}
                                  {item.time} by{" "}
                                  <Link to={`/author?${item.user_id}`}>
                                    @{item.offer_by}
                                  </Link>
                                </p>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <div className="no_data_history">
                          <span>No Recent Activities</span>
                        </div>
                      )}
                    </ul>
                  </div>
                  <div className="tab-pane fade" id="nav-contact">
                    <ul className="list-unstyled">
                      {/* Single Tab List */}
                      {data ? (
                        data.map((item, idx) => {
                          return item.offer_by ? (
                            <li
                              key={`ato_${idx}`}
                              className="single-tab-list d-flex align-items-center"
                            >
                              <Link to={`/nft-details?${item.nft_id}`}>
                                <img
                                  className="avatar-lg"
                                  src={`${ENV.API_URL_image_media}${item.nft_image}`}
                                  alt=""
                                />
                              </Link>
                              <div className="activity-content display-inline ml-4">
                                <Link to={`/nft-details?${item.nft_id}`}>
                                  <h5 className="mt-0 mb-2">{item.nft}</h5>
                                </Link>
                                <p className="m-0">
                                  Bid listed for <strong>${item.price}</strong>{" "}
                                  {moment(item.bidding_date).fromNow()}
                                  {item.time} by{" "}
                                  <Link to={`/author?${item.user_id}`}>
                                    @{item.offer_by}
                                  </Link>
                                </p>
                              </div>
                            </li>
                          ) : (
                            <div className="no_data_history">
                              <span>No Bidding List</span>
                            </div>
                          );
                        })
                      ) : (
                        <div className="no_data_history">
                          <span>No Purchase List</span>
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Activity;
