import React, { useEffect, useState } from "react";
import $ from "jquery";
import { ENV } from "../../env";
import jwt_decode from "jwt-decode";
import NFT from "../../services/nft.service";
import Collection from "../../services/collections.service";
import favoriteNft from "../../services/favoriteNft.service";
import NftCard from "./NftCard";

let limit = 8;
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
  const [favNFT, setFavNFT] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(async () => {
    $("html,body").animate({ scrollTop: 0 }, "slow");
    let token = JSON.parse(localStorage.getItem("access"));
    if (token) {
      const decoded = jwt_decode(token);
      const loggedUser = decoded.user_id;
      Get_Favourite_Updated(loggedUser);
    }
    setLoader(true);
    pagination();
    filterCollectionList();
  }, []);
  const check_favourite = (nftid) => {
    let token = JSON.parse(localStorage.getItem("access"));
    const decoded = jwt_decode(token);
    const loggedUser = decoded.user_id;
    let filtered_data = favNFT.filter((arrItem) => arrItem?.nft_id == nftid);
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
    favouriteCall(favourite_payload, userid);
  };
  const add_favourite = (nftid, userid) => {
    const favourite_payload = {
      user: userid,
      is_favorite: true,
      nft: nftid,
    };
    favouriteCall(favourite_payload, userid);
  };
  const favouriteCall = async (fvtNFTData, userid) => {
    const result = await favoriteNft.favoriteNftPost(
      `${ENV.API_URL}api/favourite-nft/`,
      fvtNFTData
    );
    if (result.status == true) {
      Get_Favourite_Updated(userid);
    }
  };
  const Get_Favourite_Updated = async (loggedUser) => {
    const result = await favoriteNft.favoriteNftGet(
      `${ENV.API_URL}api/users-favourtie-nft/${loggedUser}/?limit=999`
    );
    newArray = result.data.user_favourite_nft;
    setFavNFT(newArray);
    return setFavNFT;
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
  const filterCollectionList = async () => {
    const res = await Collection.collection(
      `${ENV.API_URL}api/specific_catgory_collection-data/0?limit=999`
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
    setLoader(false);
  };
  const resetFilter = async (no) => {
    setLoader(true)
    const res = await NFT.nftget(
      `${ENV.API_URL}api/nft_list/?page=${no}&limit=${limit}`
    );
    setNftData(res.data.data.results);
    setLoader(false)
   
    $("#loadmorebtn").show();
    if (res.data.data.count === res.data.data.results.length) {
      $("#loadmorebtn").fadeOut("slow");
    }
    setPage(2);
  };
  const saleType = async (value) => {
    $(".collection_filter_label label").removeClass("active");
    $("#loadmorebtn").hide();
    let limit_sale = 999;
    const nFilters = await favoriteNft.saleTypeGet(
      `${ENV.API_URL}api/nft-filters/?sale_type=${value}&limit=${limit_sale}`
    );
    setNftData(nFilters.data.data.results);
  };
  const collectionNFT = async (id) => {
    $(".saletype_filter_label label").removeClass("active");
    $("#loadmorebtn").hide();
    let limit_collection = 999;
    const res = await Collection.collection(
      `${ENV.API_URL}api/specific_collection/${id}/?limit=${limit_collection}`
    );
    setNftData(res.data.data.nft_collection);
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
            <div className="row">
              <div className="col-12">
                <div className="collapse" id="collapseFilter">
                  <div className="sales-type d-sm-flex align-items-sm-baseline my-4">
                    <h6 className="mr-5 mb-sm-0 mb-3">Sale Types</h6>
                    <div
                      id="myElement"
                      className="explore-menu btn-group btn-group-toggle saletype_filter_label"
                      data-toggle="buttons"
                    >
                      <label
                        onClick={() => saleType("fixed_price")}
                        className="btn d-table mr-5 p-0"
                      >
                        <input
                          type="radio"
                          defaultValue="Fixed Price"
                          className="explore-btn"
                        />
                        <span>Fixed Price</span>
                      </label>
                      <label
                        onClick={() => saleType("on_auction")}
                        className="btn d-table mr-5 p-0"
                      >
                        <input
                          type="radio"
                          defaultValue="Live Auction"
                          className="explore-btn"
                        />
                        <span>Live Auction</span>
                      </label>
                      <label
                        onClick={() => saleType("recent")}
                        className="btn d-table mr-5 p-0"
                      >
                        <input
                          type="radio"
                          defaultValue="Recently Added"
                          className="explore-btn"
                        />
                        <span>Recently Added</span>
                      </label>
                    </div>
                  </div>
                  <div className="sales-type d-sm-flex my-4 align-items-sm-baseline">
                    <h6 className="mr-5 mb-sm-0 mb-3">Collections</h6>
                    <div
                      id="myElement"
                      className="filter-collection-list d-flex w-100 explore-menu btn-group-toggle collection_filter_label"
                      data-toggle="buttons"
                    >
                      {collectionData
                        ? collectionData.map((cItem, id) => (
                            <label
                              onClick={() => collectionNFT(cItem.id)}
                              className="btn d-table mr-5 p-0"
                            >
                              <input
                                type="radio"
                                defaultValue={cItem.collection_name}
                                className="explore-btn"
                              />
                              <span>{cItem.collection_name}</span>
                            </label>
                          ))
                        : ""}
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <h6
                      className="mb-0 mt-3 pointer"
                      onClick={() => resetFilter(1)}
                    >
                      Reset Filters
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="row items">
              {nftData?.length > 0 ? (
                nftData.map((item, id) => {
                  const favindex = favNFT.findIndex((x) => x.nft_id == item.id);

                  return (
                    <NftCard
                      key={item?.id}
                      item={item}
                      favNFT={favNFT}
                      //loggedUser={loggedUser}
                      check_favourite={check_favourite}
                      isFav={favindex > -1 ? true : false}
                    />
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
      )}
    </>
  );
};

export default ExploreFour;
