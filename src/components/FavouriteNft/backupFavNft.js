import { ENV } from "../../env";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import favoriteNft from "../../services/favoriteNft.service";
import $ from "jquery"
import FillHeart from "../../assets/fillHeart";

const FavouriteNft = () => {
  const token = JSON.parse(localStorage.getItem("access"));
  const decoded = jwt_decode(token);
  const loggedUser = decoded.user_id;
  const [favNFT, setFavNFT] = useState([]);
  const [nftData, setNftData] = useState([]);
  const [page, setPage] = useState(1);

  let limit = 2;
  useEffect(async () => {
    updated_favourite_list();
  }, []);
  const check_favourite = async (nftid, loggedUser) => {
    const favourite_payload = {
      user: loggedUser,
      is_favorite: false,
      nft: nftid,
    };

    favouriteCall(favourite_payload);
    
  };
  const updated_favourite_list = async () => {
    const result = await favoriteNft.favoriteNftGet(
      `${ENV.API_URL}api/users-favourtie-nft/${loggedUser}?page=${page}&limit=${limit}`
    );
    let newArray = [...nftData ,...result.data.user_favourite_nft]
    setNftData(newArray);
    // console.log(result.data.pagination.total)
    // console.log(newArray.length)
    if (result.data.pagination.total === newArray.length) {
      $("#loadmorebtnfav").fadeOut("slow");
    }
    setPage(page + 1);
  };
  const favouriteCall = async (favourite_payload) => {
    
    const result = await favoriteNft.favoriteNftPost(
      `${ENV.API_URL}api/favourite-nft/`,
      favourite_payload
    );
    console.log(result);
    if (result.status === true) {
      debugger
      let abc = 1
      setPage(abc)
      
      updated_favourite_list_1(abc);
    }
  };
  const updated_favourite_list_1 = async (abc) => {
    
    const result = await favoriteNft.favoriteNftGet(
      `${ENV.API_URL}api/users-favourtie-nft/${loggedUser}?page=${abc}&limit=${limit}`
    );
    let newArray = result.data.user_favourite_nft
    setNftData(newArray);
   
    result.data.pagination.total === newArray.length ? $("#loadmorebtnfav").fadeOut("slow") :  $("#loadmorebtnfav").fadeIn("slow")
      
    
    setPage(page + 1);
  };
  return (
    <>
      <div className="row items">
        {nftData ? (
          nftData.map((item, id) => {
            return item.nft_name !== null ? (
              <div key={`exf_${id}`} className="col-12 col-sm-6 col-lg-3 item">
                <div className="card">
                  <div className="image-over">
                    <Link to={`/nft-details?${item.nft_id}`}>
                      <img
                        className="card-img-top image-container-nft"
                        src={`${ENV.API_URL_image_media}${item.nft_image}`}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="card-caption col-12 p-0">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <Link to={`/nft-details?${item.nft_id}`}>
                          <h5 className="mb-0">{item.nft_name}</h5>
                        </Link>

                        <button
                          onClick={() =>
                            check_favourite(item.nft_id, item.user_id)
                          }
                          className="set"
                        >
                          <FillHeart/>
                        </button>
                      </div>
                      <div className="seller d-flex align-items-center my-3 text-nowrap">
                        <span>Owned By</span>
                        <Link
                          className="name_trim"
                          to={`/author?${item.owner_id}`}
                        >
                          <h6 className="ml-2 mb-0 ">
                            {"@" + item.owner_name}
                          </h6>
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
                        Place a bid
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no_data">
                <span>No Favourite Nft Added</span>
              </div>
            );
          })
        ) : (
          <div className="no_data">
            <span>No Favourite Nft Added</span>
          </div>
        )}
      </div>
      <div className="row">
          <div className="col-12 text-center">
            <button
              onClick={() => updated_favourite_list()}
              className="btn btn-bordered-white mt-5"
              id="loadmorebtnfav"
            >
              Load More
            </button>
          </div>
        </div>
    </>
  );
};
export default FavouriteNft;
