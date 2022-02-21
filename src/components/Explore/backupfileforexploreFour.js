import React, { useEffect, useState } from "react";
import $ from "jquery";
import FavNFT from "./FavNFT";
import { ENV } from "../../env";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import NFT from "../../services/nft.service";
import Category from "../../services/category.service";
import Collection from "../../services/collections.service";
import favoriteNft from "../../services/favoriteNft.service";

let limit = 8;
let count = true;
const ExploreFour = () => {
  const initialData = {
    heading: "Exclusive Digital Assets",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    btnText: "Load More",
  };
  let newArray = [];
  const [initData] = useState(initialData);
  const [nftData, setNftData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [page, setPage] = useState(1);
  const [favNFT, setFavNFT] = useState();
  const [collectionData, setCollectionData] = useState([]);
  let token = JSON.parse(localStorage.getItem("access"));

  useEffect(async () => {
    $("html,body").animate({ scrollTop: 0 }, "slow");
    pagination();
    filterCollectionList();
    let token = JSON.parse(localStorage.getItem("access"));
    if (token) {
      const decoded = jwt_decode(token);
      const loggedUser = decoded.user_id;
      Get_Favourite_Updated(loggedUser);
    }
  }, []);
  const check_favourite = async (nftid) => {
    let token = JSON.parse(localStorage.getItem("access"));
    const decoded = jwt_decode(token);
    const loggedUser = decoded.user_id;

    let filtered_data = favNFT.filter((arrItem) => arrItem.nft_id == nftid);
    if (filtered_data.length > 0) {
      remove_favourite(nftid, loggedUser);
    } else {
      add_favourite(nftid, loggedUser);
    }
  };
  const remove_favourite = (nftid, userid) => {
    const favourite_payload = {
      user: userid,
      is_favorite: false,
      nft: nftid,
    };
    favouriteCall(favourite_payload);
  };
  const add_favourite = (nftid, userid) => {
    const favourite_payload = {
      user: userid,
      is_favorite: true,
      nft: nftid,
    };
    favouriteCall(favourite_payload);
  };
  const favouriteCall = async (fvtNFTData) => {
    const result = await favoriteNft.favoriteNftPost(
      `${ENV.API_URL}api/favourite-nft/`,
      fvtNFTData
    );
    if (result.status == true) {
      alert(result.message);
      Get_Favourite_Updated();
    }
  };
  const sort = (col) => {
    if (order === "ASC") {
      const sorted = [...nftData].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setNftData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...nftData].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setNftData(sorted);
      setOrder("ASC");
    }
  };
  const Get_Favourite_Updated = async (loggedUser) => {
    const result = await favoriteNft.favoriteNftGet(
      `${ENV.API_URL}api/users-favourtie-nft/${loggedUser}/`
    );
    newArray = result.data.user_favourite_nft;
    console.log(newArray);
    setFavNFT(result.data.user_favourite_nft);
  };
  const filterCollectionList = async () => {
    $("#myElement label:first").addClass("active");
    const res = await Collection.collection(
      `${ENV.API_URL}api/specific_catgory_collection-data/0`
    );
    setCollectionData(res.data.data.category_data);
  };
  const pagination = async () => {
    const res = await NFT.nftget(
      `${ENV.API_URL}api/nft_list/?page=${page}&limit=${limit}`
    );
    let newArr = [...nftData, ...res.data.data.results];
    setNftData(newArr);
    if (res.data.data.count === newArr.length) {
      $("#loadmorebtn").fadeOut("slow");
    }
    setPage(page + 1);
  };
  const resetFilter = async (no) => {
    const res = await NFT.nftget(
      `${ENV.API_URL}api/nft_list/?page=${no}&limit=${limit}`
    );
    setNftData(res.data.data.results);
  };
  const saleType = async (value) => {
    $("#myElement").addClass("active");
    const nFilters = await favoriteNft.saleTyeGet(
      `${ENV.API_URL}api/nft-filters/?sale_type=${value}?page=${page}&limit=${limit}`
    );
    console.log(nFilters)
    setNftData(nFilters.data.results);
  };
  const collectionNFT = async (id) => {
    const res = await Collection.collection(
      `${ENV.API_URL}api/specific_collection/${id}/?page=${page}&limit=${limit}`
    );
    setNftData(res.data.data.nft_collection);
  };
  return (
    <section className="explore-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            <div className="intro text-center">
              <h3 className="mt-3 mb-0">{initData.heading}</h3>
              <p>{initData.content}</p>
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col-xl-3 col-sm-6 text-right order-sm-last">
            <div class="form-group filter-select position-relative m-0">
              <select class="form-control " onChange={(e) => sort("price")}>
                <option disabled selected hidden>
                  Select price
                </option>
                <option>Price Low - High</option>
                <option>Price High - Low</option>
              </select>
            </div>
          </div>
          <div className="col-sm-6 col-xl-9">
            <button
              className="btn px-5 my-sm-0 my-3"
              type="button"
              data-toggle="collapse"
              data-target="#collapseFilter"
              aria-expanded="false"
              aria-controls="collapseFilter"
            >
              Filter
            </button>
          </div>
        </div>
        <div className="row " id="myElement"> 
          <div className="col-12">
            <div className="collapse" id="collapseFilter">
              <div className="sales-type d-flex align-items-sm-center my-3">
                <h6 className="mr-5">Sale Types</h6>
                <div className="d-sm-flex">
                  <span
                    className="mr-4"
                    onClick={() => saleType("fixed_price")}
                  >
                    Fixed Price
                  </span>
                  <span className="mr-4" onClick={() => saleType("on_auction")}>
                    Live Auction
                  </span>
                  <span className="mr-4" onClick={() => saleType("recent")}>
                    Recently Added
                  </span>
                </div>
              </div>
              <div className="sales-type d-flex align-items-sm-center my-3">
                <h6 className="mr-5">Collections</h6>
                <div className="d-sm-flex">
                  {collectionData
                    ? collectionData.map((cItem, id) => (
                        <span
                          className="mr-4"
                          onClick={() => collectionNFT(cItem.id)}
                        >
                          {cItem.collection_name}
                        </span>
                      ))
                    : ""}
                </div>
              </div>
              {/* <div className="currency-form d-flex align-items-lg-center my-3">
                <h6 className="mr-5">Currencies</h6>
                <form className="d-lg-flex align-items-center justify-content-between">
                  <div className="d-lg-flex">
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="bnb"
                        value="option1"
                      />
                      <label class="form-check-label" for="bnb">
                        Binance (BNB)
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="usd"
                        value="option1"
                      />
                      <label class="form-check-label" for="usd">
                        Dollar (USD)
                      </label>
                    </div>
                    <div className="d-sm-flex my-3 my-lg-0 justify-content-between">
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Min"
                      />
                      <span> - </span>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Max"
                      />
                      <button
                        type="submit"
                        className="btn btn-bordered-white ml-sm-3 mt-3 mt-sm-0"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="reset-filter">Reset</span>
                  </div>
                </form>
              </div> */}
              <div  className="d-flex justify-content-end pointer">
                <h6 onClick={() => resetFilter(1)}>Reset Filters</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="row items">
          {nftData ? (
            nftData.map((item, id) => {
              return (
                <div
                  key={`exf_${id}`}
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
                        <div className="d-flex justify-content-between">
                          <Link to={`/nft-details?${item.id}`}>
                            <h5 className="mb-0">{item.name}</h5>
                          </Link>
                          {token ? (
                            <button
                              onClick={() =>
                                check_favourite(item.id, item.user_id)
                              }
                              className="set"
                            >
                              {(count = true)}
                              {favNFT
                                ? favNFT.map((fItem, fid) => {
                                    if (fItem.nft_id == item.id) {
                                      count = false;
                                      return (
                                        <i className="fas fa-heart fa-2x heart_color" />
                                      );
                                    }
                                  })
                                : ""}
                              {count == true ? (
                                <i className="fas fa-heart fa-2x" />
                              ) : (
                                ""
                              )}
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="seller d-flex align-items-center my-3 text-nowrap">
                          <span>Owned By</span>
                          <Link
                            className="name_trim"
                            to={`/author?${item.user_id}`}
                          >
                            <h6 className="ml-2 mb-0 ">{"@" + item.owner}</h6>
                          </Link>
                        </div>
                        <div className="card-bottom d-flex justify-content-between">
                          <span>{"$" + item.price}</span>
                          <span>{item.size}</span>
                        </div>
                        <Link
                          className="btn btn-bordered-white btn-smaller mt-3"
                          to="/wallet-connect"
                        >
                          <i className="icon-handbag mr-2" />
                          place a bid
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no_data">
              <span>No item to Explore</span>
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
  );
};

export default ExploreFour;
