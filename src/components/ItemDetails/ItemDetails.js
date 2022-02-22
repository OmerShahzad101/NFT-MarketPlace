import moment from "moment";
import { ENV } from "../../env";
import { Link } from "react-router-dom";
import NFT from "../../services/nft.service";
import React, { useEffect, useState } from "react";
import reportNft from "../../services/reportNf.service";
import Notifications, { notify } from "react-notify-toast";
import $ from "jquery";
const initialData = {
  count: "1 of 5",
  volume: "64.1",
  highest_bid: "2.9 BNB",
  bid_count: "1 of 5",
  btnText: "Place a Bid",
};

const ItemDetails = () => {
  const arr = window.location.href.split("?");
  const id = arr[1];

  const initialstates = {
    report_type: " ",
    nft: "",
  };
  const token = JSON.parse(localStorage.getItem("access"));

  const [initData] = useState(initialData);
  const [nftbiddingHistory, setNftbiddingHistory] = useState();
  const [nftData, setNftData] = useState([]);
  const [nftReport, setNftReport] = useState(initialstates);
  nftReport.nft = id;

  useEffect(() => {
    $("html,body").animate({ scrollTop: 0 }, "slow");
    const fetchNftData = async () => {
      const res = await NFT.nftget(`${ENV.API_URL}api/specific_nft/${id}/`);
      setNftData(res.data.data);
      console.log(res.data.data);
    };

    const fetchNftBiddingData = async () => {
      const result = await NFT.nftBiddingList(
        `${ENV.API_URL}api/specific_bidding_nft/${id}/`
      );
      setNftbiddingHistory(result.data.bidding_data);
     
    };
    fetchNftData();
    fetchNftBiddingData();
  }, []);
  const report = async (e) => {
    
    e.preventDefault();
    const result = await reportNft.reportNftItem(
      `${ENV.API_URL}api/create_reported_nft/`,
      nftReport
      );
      if (result.status === true) {
        notify.show("Reported Succesfully!", "success", 3000);
        $(".modal-footer button").attr("data-dismiss", "modal");
        
        setTimeout(function(){
          $(".modal-footer button")[0].click();
          $(".modal-footer button").removeAttr("data-dismiss", "modal");
       }, 1000);
    }
    
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNftReport({
      ...nftReport,
      [name]: value,
    });
  };
  return (
    <section className="item-details-area">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-lg-5">
            <div className="item-info">
              <div className="item-thumb text-center">
                <img src={`${ENV.API_URL_image}${nftData.image}`} alt="nft" />
              </div>

              {nftData.expiry_date ? (
                <div className="card no-hover countdown-times my-4">
                  <div
                    className="countdown d-flex justify-content-center"
                    data-date={moment(nftData.expiry_date).format("YYYY-MM-DD")}
                  />
                </div>
              ) : (
                <div className="my-4"></div>
              )}
              <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
                <li>
                  <a
                    className="active"
                    id="nav-home-tab"
                    data-toggle="pill"
                    href="#nav-home"
                  >
                    <h5 className="m-0">Bids</h5>
                  </a>
                </li>
                <li>
                  <a
                    id="nav-profile-tab"
                    data-toggle="pill"
                    href="#nav-profile"
                  >
                    <h5 className="m-0">History</h5>
                  </a>
                </li>
                <li>
                  <a
                    id="nav-contact-tab"
                    data-toggle="pill"
                    href="#nav-contact"
                  >
                    <h5 className="m-0">Details</h5>
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home">
                  <ul className="list-unstyled">
                    {nftbiddingHistory ? (
                      nftbiddingHistory.map((item, idx) => {
                        return item.bidding_price ? (
                          <li
                            key={`tdo_${idx}`}
                            className="single-tab-list d-flex align-items-center"
                          >
                            {console.log(`${nftData.profile_image}`)}
                            <img
                              className="avatar-sm rounded-circle mr-3"
                              src={`${ENV.API_URL_image_media}${item.profile_image}`}
                              alt=""
                            />
                            <p className="m-0">
                              Bid listed for{" "}
                              <strong>${item.bidding_price}</strong>{" "}
                              {moment(item.bidding_date).fromNow()} {"  "}
                              <br />
                              by
                              <Link to={`/author?${item.user_id}`}>
                                @{item.offer_by}
                              </Link>
                            </p>
                          </li>
                        ) : (
                          <div className="no_data_history">
                            <span>No Bidding List</span>
                          </div>
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
                    {nftbiddingHistory ? (
                      nftbiddingHistory.map((item, idx) => {
                        return item.bidding_price ? (
                          <li
                            key={`tdo_${idx}`}
                            className="single-tab-list d-flex align-items-center"
                          >
                            <img
                              className="avatar-sm rounded-circle mr-3"
                              src={`${ENV.API_URL_image_media}${item.profile_image}`}
                              alt=""
                            />
                            <p className="m-0">
                              Bid listed for{" "}
                              <strong>${item.bidding_price}</strong>{" "}
                              {moment(item.bidding_date).fromNow()} {"  "}
                              <br />
                              by
                              <Link to={`/author?${item.user_id}`}>
                                @{item.offer_by}
                              </Link>
                            </p>
                          </li>
                        ) : (
                          <div className="no_data_history">
                            <span>No History Found</span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="no_data_history">
                        <span>No History Found</span>
                      </div>
                    )}
                  </ul>
                </div>
                <div className="tab-pane fade" id="nav-contact">
                  <div className="owner-meta d-flex align-items-center mt-3">
                    <span>Owner</span>
                    <Link
                      className="owner d-flex align-items-center ml-2"
                      to={`/author?${nftData.user_id}`}
                    >
                      <img
                        className="avatar-sm rounded-circle"
                        src={`${ENV.API_URL_image}${nftData.profile_image}`}
                        alt=""
                      />
                      <h6 className="ml-2">{nftData.owner}</h6>
                    </Link>
                  </div>{" "}
                  <p className="mt-2">
                    Created : {moment(nftData.created_at).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="content mt-5 mt-lg-0">
              <div className="d-flex justify-content-between">
                <h3 className="m-0">{nftData.name}</h3>
                <div class="btn-group  dropleft">
                  {token ? (
                    <button
                      className="report_nft_dropdown "
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  ) : (
                    ""
                  )}
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      class="dropdown-item report_nft_dropdown_item"
                      data-toggle="modal"
                      data-target="#reportnft_modal"
                    >
                      <i class="fa fa-flag mr-2"></i> Report
                    </a>
                  </div>
                </div>
              </div>
              {/* report nft modal */}
              <div
                class="modal fade"
                id="reportnft_modal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content reportnft-modal ">
                    <Notifications />

                    <div class="modal-header">
                      <h5 class="modal-title  m-0" id="exampleModalLabel">
                        Report this item
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <form onSubmit={report}>
                      <div class="modal-body py-3">
                        <div class="form-group">
                          <label
                            for="exampleFormControlSelect1"
                            className="mb-1"
                          >
                            I think this item is...
                          </label>
                          <select
                            name="report_type"
                            value={nftReport.report_type}
                            onChange={handleChange}
                            class="form-control"
                            id="exampleFormControlSelect1"
                            required
                          >
                            <option
                              value=""
                              selected="selected"
                              hidden="hidden"
                            >
                              Select a reason
                            </option>
                            <option name="fake" value="fake">
                              Fake
                            </option>
                            <option name="explicit" value="explicit">
                              Explicit
                            </option>
                            <option
                              name="might_be_stolen"
                              value="might_be_stolen"
                            >
                              Stolen
                            </option>
                            <option name="other" value="other">
                              Other{" "}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="modal-footer mr-3">
                        <button type="sumbit" class="btn btn-primary">
                          Report
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <p>{nftData.description}</p>
              <div className="owner d-flex align-items-center">
                <span>Owned By</span>
                <Link
                  className="owner-meta d-flex align-items-center ml-3"
                  to={`/author?${nftData.user_id}`}
                >
                  <img
                    className="avatar-sm rounded-circle"
                    src={`${ENV.API_URL_image}${nftData.profile_image}`}
                    alt=""
                  />
                  <h6 className="ml-2">{nftData.owner}</h6>
                </Link>
              </div>
              <div className="item-info-list mt-4">
                <ul className="list-unstyled">
                  <li className="price d-flex justify-content-between">
                    <span>Current Price: {"$" + nftData.price}</span>
                    {/* <span>{"$" + nftData.price}</span> */}
                    {/* <span>{initData.count}</span> */}
                    <span></span>
                  </li>
                  <li>
                    <span>Size </span>
                    <span>{nftData.size}</span>
                  </li>
                  {/* <li>
                    <span>Volume Traded </span>
                    <span>{initData.volume}</span>
                  </li> */}
                </ul>
              </div>
              <div className="row items">
                <div className="col-12 col-md-6 item px-lg-2">
                  <div className="card no-hover">
                    <div className="single-seller d-flex align-items-center">
                      <Link to={`/author?${nftData.user_id}`}>
                        <img
                          className="avatar-md rounded-circle"
                          src={`${ENV.API_URL_image}${nftData.profile_image}`}
                          alt=""
                        />
                      </Link>
                      <div className="seller-info ml-3">
                        <Link
                          className="seller mb-2 name_trim"
                          to={`/author?${nftData.user_id}`}
                        >
                          {"@" + nftData.owner}
                        </Link>
                        <span>Creator</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 item px-lg-2">
                  <div className="card no-hover">
                    <div className="single-seller d-flex align-items-center">
                      <Link to={`/collectionDetail?${nftData.collection_id}`}>
                        <img
                          className="avatar-md rounded-circle"
                          src={`${ENV.API_URL_image_media}${nftData.banner_image}`}
                          alt=""
                        />
                      </Link>
                      <div className="seller-info ml-3">
                        <a
                          className="seller mb-2 name_trim"
                          href={`/collectionDetail?${nftData.collection_id}`}
                        >
                          {nftData.collection}
                        </a>
                        <span>Collection</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="col-12 item px-lg-2">
                  <div className="card no-hover">
                    <h4 className="mt-0 mb-2">Highest Bid</h4>
                    <div className="price d-flex justify-content-between align-items-center">
                      <span>{initData.highest_bid}</span>
                      <span>{initData.bid_count}</span>
                    </div>
                  </div>
                </div> */}
              </div>
              <Link
                className="d-block btn btn-bordered-white mt-4"
                to="/wallet-connect"
              >
                {initData.btnText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetails;
