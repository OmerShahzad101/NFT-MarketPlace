import React, { useEffect, useState } from "react";
import activity from "../../services/activity.service";
import { ENV } from "../../env";
import moment from "moment";
import { Link } from "react-router-dom";

const Activity = () => {
  //__ __Hook Function __ __ //
  const [data, setData] = useState();

  useEffect(async () => {
    // __ __ API Call to Fetch all bidding list __ __ //
    const res = await activity.activityGet(`${ENV.API_URL}api/bidding/`);
    setData(res.data.data.results);
  }, []);

  return (
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
                <a id="nav-profile-tab" data-toggle="pill" href="#nav-profile">
                  <h5 className="m-0">Recent</h5>
                </a>
              </li>
              <li>
                <a id="nav-contact-tab" data-toggle="pill" href="#nav-contact">
                  <h5 className="m-0">Purchase</h5>
                </a>
              </li>
            </ul>
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-home">
                <ul className="list-unstyled">
                  {data
                    ? data.map((item, idx) => {
                        return (
                          <li
                            key={`ato_${idx}`}
                            className="single-tab-list d-flex align-items-center"
                          >
                            <Link to={`/nft-details?${item.id}`}>
                              <img
                                className="avatar-lg"
                                src={`${ENV.API_URL_image_media}${item.nft_image}`}
                                alt=""
                              />
                            </Link>
                            <div className="activity-content display-inline ml-4">
                              <a href="/item-details">
                                <h5 className="mt-0 mb-2">{item.nft}</h5>
                              </a>
                              <p className="m-0">
                                Bid listed for <strong>${item.price}</strong>{" "}
                                {moment(item.bidding_date).fromNow()}
                                {item.time} by{" "}
                                <Link to="/author">@{item.offer_by}</Link>
                              </p>
                            </div>
                          </li>
                        );
                      })
                    : " "}
                </ul>
              </div>
              <div className="tab-pane fade" id="nav-profile">
                <ul className="list-unstyled">
                  {data
                    ? data.map((item, idx) => {
                        return (
                          <li
                            key={`ato_${idx}`}
                            className="single-tab-list d-flex align-items-center"
                          >
                            <a href="/item-details">
                              <img
                                className="avatar-lg"
                                src={`${ENV.API_URL_image_media}${item.nft_image}`}
                                alt=""
                              />
                            </a>
                            <div className="activity-content display-inline ml-4">
                              <a href="/item-details">
                                <h5 className="mt-0 mb-2">{item.nft}</h5>
                              </a>
                              <p className="m-0">
                                Bid listed for <strong>${item.price}</strong>{" "}
                                {moment(item.bidding_date).fromNow()}
                                {item.time} by{" "}
                                <a href="/author">@{item.offer_by}</a>
                              </p>
                            </div>
                          </li>
                        );
                      })
                    : " "}
                </ul>
              </div>
              <div className="tab-pane fade" id="nav-contact">
                <ul className="list-unstyled">
                  {/* Single Tab List */}
                  {data
                    ? data.map((item, idx) => {
                        return item.offer_by ? (
                          <li
                            key={`ato_${idx}`}
                            className="single-tab-list d-flex align-items-center"
                          >
                            <a href="/item-details">
                              <img
                                className="avatar-lg"
                                src={`${ENV.API_URL_image_media}${item.nft_image}`}
                                alt=""
                              />
                            </a>
                            <div className="activity-content display-inline ml-4">
                              <a href="/item-details">
                                <h5 className="mt-0 mb-2">{item.nft}</h5>
                              </a>
                              <p className="m-0">
                                Bid listed for <strong>${item.price}</strong>{" "}
                                {moment(item.bidding_date).fromNow()}
                                {item.time} by{" "}
                                <a href="/author">@{item.offer_by}</a>
                              </p>
                            </div>
                          </li>
                        ) : (
                          " No Bidding List"
                        );
                      })
                    : " "}
                </ul>
              </div>
            </div>
          </div>
          {/* <div className="col-12 col-md-6 col-lg-4">
            <div className="activity-content mt-5 mt-lg-0">
              <div className="single-widget">
                <div className="widget-content search-widget">
                  <form action="#">
                    <input type="text" placeholder="Enter your keywords" />
                  </form>
                </div>
              </div>
              {/* <div className="single-widget">
                <div className="widget filter-widget">
                  <h4 className="title">{data.widgetTitle}</h4>
                  <div className="widget-content">
                    <div className="widget-content filter-widget-items mt-3">
                      {filterData.map((item, idx) => {
                        return (
                          <a key={`fd_${idx}`} href="#" className="badge tag">
                            {item.title}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div> 
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Activity;
