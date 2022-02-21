import $ from "jquery";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { ENV } from "../../env";
import Collection from "../../services/collections.service";
import favoriteNft from "../../services/favoriteNft.service";
import NFT from "../../services/nft.service";
import NftCard from "./NftCard";

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
  const [favNFT, setFavNFT] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const token = JSON.parse(localStorage.getItem("access"));
  const decoded = jwt_decode(token);
  const loggedUser = decoded.user_id;
  useEffect(async () => {
    $("html,body").animate({ scrollTop: 0 }, "slow");
    Get_Favourite_Updated();
    pagination();
    filterCollectionList();
  }, []);
  const check_favourite = async (nftid) => {
    debugger;
    let filtered_data = favNFT.filter((arrItem) => arrItem?.nft_id == nftid);
    if (filtered_data.length > 0) {
      remove_favourite(nftid, loggedUser);
    } else {
      add_favourite(nftid, loggedUser);
    }
  };
  const remove_favourite = async (nftid, userid) => {
    const favourite_payload = {
      user: userid,
      is_favorite: false,
      nft: nftid,
    };
    await favouriteCall(favourite_payload);
  };
  const add_favourite = async (nftid, userid) => {
    const favourite_payload = {
      user: userid,
      is_favorite: true,
      nft: nftid,
    };
    await favouriteCall(favourite_payload);
  };
  const favouriteCall = async (fvtNFTData) => {
    const result = await favoriteNft.favoriteNftPost(
      `${ENV.API_URL}api/favourite-nft/`,
      fvtNFTData
    );
    if (result.status == true) {
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
  const Get_Favourite_Updated = async () => {
    try {
      const result = await favoriteNft.favoriteNftGet(
        `${ENV.API_URL}api/users-favourtie-nft/${loggedUser}/`
      );
      newArray = result.data.user_favourite_nft;
      setFavNFT(result.data.user_favourite_nft);
    } catch (error) {}
  };
  const filterCollectionList = async () => {
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
    // updateNftData();
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
    const nFilters = await favoriteNft.favoriteNftGet(
      `${ENV.API_URL}api/nft-filters/?sale_type=${value}?page=${page}&limit=${limit}`
    );
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
        <div className="row">
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
              <div className="currency-form d-flex align-items-lg-center my-3">
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
              </div>
              <div>
                <h6 onClick={() => resetFilter(1)}>Reset Filters</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="row items">
          {nftData?.length > 0 ? (
            nftData.map((item, index) => {
              debugger;
              const favindex = favNFT.findIndex((x) => x.nft_id == item.id);
              return (
                <NftCard
                  key={item?.id}
                  item={item}
                  favNFT={favNFT}
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
  );
};

export default ExploreFour;
