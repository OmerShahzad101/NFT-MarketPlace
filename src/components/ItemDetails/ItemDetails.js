import React, { useEffect, useState } from "react";
import { ENV } from "../../env";
import NFT from "../../services/nft.service";
import reportNft from "../../services/reportNf.service";

const initialData = {
  itemImg: "/img/auction_2.jpg",
  date: "2022-03-30",
  tab_1: "Bids",
  tab_2: "History",
  tab_3: "Details",
  ownerImg: "/img/avatar_1.jpg",
  created: "15 Jul 2021",

  price_1: "1.5 ETH",
  price_2: "$500.89",
  count: "1 of 5",
  size: "14000 x 14000 px",
  volume: "64.1",
  highest_bid: "2.9 BNB",
  bid_count: "1 of 5",
  btnText: "Place a Bid",
};

const initialtabData_1 = [
  {
    id: "1",
    img: "/img/avatar_1.jpg",
    price: "14 ETH",
    time: "4 hours ago",
    author: "@arham",
  },
  {
    id: "2",
    img: "/img/avatar_2.jpg",
    price: "10 ETH",
    time: "8 hours ago",
    author: "@junaid",
  },
  {
    id: "3",
    img: "/img/avatar_3.jpg",
    price: "12 ETH",
    time: "3 hours ago",
    author: "@yasmin",
  },
];

const initialtabData_2 = [
  {
    id: "1",
    img: "/img/avatar_6.jpg",
    price: "32 ETH",
    time: "10 hours ago",
    author: "@hasan",
  },
  {
    id: "2",
    img: "/img/avatar_7.jpg",
    price: "24 ETH",
    time: "6 hours ago",
    author: "@artnox",
  },
  {
    id: "3",
    img: "/img/avatar_8.jpg",
    price: "29 ETH",
    time: "12 hours ago",
    author: "@meez",
  },
];

const initialsellerData = [
  {
    id: "1",
    img: "/img/avatar_1.jpg",
    seller: "@ArtNoxStudio",
    post: "Creator",
  },
  {
    id: "2",
    img: "/img/avatar_2.jpg",
    seller: "Virtual Worlds",
    post: "Collection",
  },
];
const ItemDetails = () => {
  const arr = window.location.href.split("?");
  const id = arr[1];

  const [initData, setInitData] = useState(initialData);
  const [tabData_1, settabData_1] = useState(initialtabData_1);
  const [tabData_2, settabData_2] = useState(initialtabData_2);
  const [sellerData, setSellerData] = useState(initialsellerData);
  const [nftData, setNftData] = useState([]);

  useEffect(async () => {
    const res = await NFT.nftget(`${ENV.API_URL}api/specific_nft/${id}/`);
    console.log(res.data);
    setNftData(res.data);
  }, []);
  const report = async () => {
    const result = await reportNft.reportNftItem(
      `${ENV.API_URL}api/reported_nft/${id}/`
    );
    console.log(result);
  };

  return (
    <section className="item-details-area">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-lg-5">
            <div className="item-info">
              <div className="item-thumb text-center">
                <img
                  src={`${ENV.API_URL_image}${nftData.image}`}
                  alt="nft image"
                />
              </div>
              <div className="card no-hover countdown-times my-4">
                <div
                  className="countdown d-flex justify-content-center"
                  data-date={initData.date}
                />
              </div>
              <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
                <li>
                  <a
                    className="active"
                    id="nav-home-tab"
                    data-toggle="pill"
                    href="#nav-home"
                  >
                    <h5 className="m-0">{initData.tab_1}</h5>
                  </a>
                </li>
                <li>
                  <a
                    id="nav-profile-tab"
                    data-toggle="pill"
                    href="#nav-profile"
                  >
                    <h5 className="m-0">{initData.tab_2}</h5>
                  </a>
                </li>
                <li>
                  <a
                    id="nav-contact-tab"
                    data-toggle="pill"
                    href="#nav-contact"
                  >
                    <h5 className="m-0">{initData.tab_3}</h5>
                  </a>
                </li>
              </ul>
              {/* Tab Content */}
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home">
                  <ul className="list-unstyled">
                    {tabData_1.map((item, idx) => {
                      return (
                        <li
                          key={`tdo_${idx}`}
                          className="single-tab-list d-flex align-items-center"
                        >
                          <img
                            className="avatar-sm rounded-circle mr-3"
                            src={item.img}
                            alt=""
                          />
                          <p className="m-0">
                            Bid listed for <strong>{item.price}</strong>{" "}
                            {item.time} <br />
                            by <a href="/author">{item.author}</a>
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="tab-pane fade" id="nav-profile">
                  <ul className="list-unstyled">
                    {tabData_2.map((item, idx) => {
                      return (
                        <li
                          key={`tdt_${idx}`}
                          className="single-tab-list d-flex align-items-center"
                        >
                          <img
                            className="avatar-sm rounded-circle mr-3"
                            src={item.img}
                            alt=""
                          />
                          <p className="m-0">
                            Bid listed for <strong>{item.price}</strong>{" "}
                            {item.time} <br />
                            by <a href="/author">{item.author}</a>
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="tab-pane fade" id="nav-contact">
                  <div className="owner-meta d-flex align-items-center mt-3">
                    <span>Owner</span>
                    <a
                      className="owner d-flex align-items-center ml-2"
                      href="/author"
                    >
                      <img
                        className="avatar-sm rounded-circle"
                        src={initData.ownerImg}
                        alt=""
                      />
                      <h6 className="ml-2">{initData.itemOwner}</h6>
                    </a>
                  </div>
                  <p className="mt-2">Created : {nftData.created_at}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="content mt-5 mt-lg-0">
              <div className="d-flex justify-content-between">
                <h3 className="m-0">{nftData.name}</h3>
                <div class="btn-group  dropleft">
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
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      class="dropdown-item report_nft_dropdown_item"
                      onClick={report}
                    >
                      <i class="fa fa-flag mr-2"></i> Report
                    </a>
                  </div>
                </div>
              </div>
              <p>{nftData.description}</p>
              {/* Owner */}
              <div className="owner d-flex align-items-center">
                <span>Owned By</span>
                <a
                  className="owner-meta d-flex align-items-center ml-3"
                  href="/author"
                >
                  <img
                    className="avatar-sm rounded-circle"
                    src={initData.ownerImg}
                    alt=""
                  />
                  <h6 className="ml-2">{nftData.owner}</h6>
                </a>
              </div>
              {/* Item Info List */}
              <div className="item-info-list mt-4">
                <ul className="list-unstyled">
                  <li className="price d-flex justify-content-between">
                    <span>Current Price: {"$" + nftData.price}</span>
                    <span>{"$" + nftData.price}</span>
                    <span>{initData.count}</span>
                  </li>
                  <li>
                    <span>Size </span>
                    <span>{nftData.size}</span>
                  </li>
                  <li>
                    <span>Volume Traded </span>
                    <span>{initData.volume}</span>
                  </li>
                </ul>
              </div>
              <div className="row items">
                {sellerData.map((item, idx) => {
                  return (
                    <div
                      key={`sd_${idx}`}
                      className="col-12 col-md-6 item px-lg-2"
                    >
                      <div className="card no-hover">
                        <div className="single-seller d-flex align-items-center">
                          <a href="/author">
                            <img
                              className="avatar-md rounded-circle"
                              src={item.img}
                              alt=""
                            />
                          </a>
                          {/* Seller Info */}
                          <div className="seller-info ml-3">
                            <a className="seller mb-2" href="/author">
                              {"@" + nftData.owner}
                            </a>
                            <span>{item.post}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="col-12 item px-lg-2">
                  <div className="card no-hover">
                    <h4 className="mt-0 mb-2">Highest Bid</h4>
                    <div className="price d-flex justify-content-between align-items-center">
                      <span>{initData.highest_bid}</span>
                      <span>{initData.bid_count}</span>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="d-block btn btn-bordered-white mt-4"
                href="/wallet-connect"
              >
                {initData.btnText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetails;
