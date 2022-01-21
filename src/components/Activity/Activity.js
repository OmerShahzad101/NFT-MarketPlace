import React, { useEffect, useState } from "react";
import activity from "../../services/activity.service";
import { ENV } from "../../env";
const Activity = () => {
  const [data, setData] = useState();

  useEffect(async () => {
    const res = await activity.activityGet(`${ENV.API_URL}api/bidding/`);
    console.log(res);
    setData(res.data)
  }, []);

  return (
    <section className="activity-area load-more">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Intro */}
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
            {/* Netstorm Tab */}
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
                            <a href="/item-details">
                              <img
                                className="avatar-lg"
                                src={`${ENV.API_URL_image_media}${item.nft_image}`}
                                alt=""
                              />
                            </a>
                            {/* Activity Content */}
                            <div className="activity-content display-inline ml-4">
                              <a href="/item-details">
                                <h5 className="mt-0 mb-2">{item.nft}</h5>
                              </a>
                              <p className="m-0">
                                Bid listed for <strong>${item.price}</strong>{" "}
                                {item.time} <br />
                                by <a href="/author">@{item.offer_by}</a>
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
                  {/* Single Tab List */}
                  {data
                    ? data.map((item, idx) => {
                        return (
                          <li
                            key={`att_${idx}`}
                            className="single-tab-list d-flex align-items-center"
                          >
                            <a href="/item-details">
                              <img
                                className="avatar-lg"
                                src={item.img}
                                alt=""
                              />
                            </a>
                            {/* Activity Content */}
                            <div className="activity-content ml-4">
                              <a href="/item-details">
                                <h5 className="mt-0 mb-2">{item.title}</h5>
                              </a>
                              <p className="m-0">
                                Bid listed for <strong>{item.price}</strong>{" "}
                                {item.time} <br />
                                by <a href="/author">{item.seller}</a>
                              </p>
                            </div>
                          </li>
                        );
                      })
                    : ""}
                </ul>
              </div>
              <div className="tab-pane fade" id="nav-contact">
                <ul className="list-unstyled">
                  {/* Single Tab List */}
                  {data
                    ? data.map((item, idx) => {
                        return (
                          <li
                            key={`atth_${idx}`}
                            className="single-tab-list d-flex align-items-center"
                          >
                            <a href="/item-details">
                              <img
                                className="avatar-lg"
                                src={item.img}
                                alt=""
                              />
                            </a>
                            {/* Activity Content */}
                            <div className="activity-content ml-4">
                              <a href="/item-details">
                                <h5 className="mt-0 mb-2">{item.title}</h5>
                              </a>
                              <p className="m-0">
                                Bid listed for <strong>{item.price}</strong>{" "}
                                {item.time} <br />
                                by <a href="/author">{item.seller}</a>
                              </p>
                            </div>
                          </li>
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
