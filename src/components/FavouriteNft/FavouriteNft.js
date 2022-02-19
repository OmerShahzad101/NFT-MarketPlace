import { ENV } from "../../env";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import favoriteNft from "../../services/favoriteNft.service";

const FavouriteNft = () => {
  let newArray = [];
  let count = true;
  const token = JSON.parse(localStorage.getItem("access"));
  const decoded = jwt_decode(token);
  const loggedUser = decoded.user_id;
  const [favNFT, setFavNFT] = useState([]);
  const [nftData, setNftData] = useState();

  useEffect(async () => {
    const result = await favoriteNft.favoriteNftGet(`${ENV.API_URL}api/users-favourtie-nft/${loggedUser}/`);
    let newArray = result.data.user_favourite_nft;
    setNftData(newArray);
  }, []);
  const check_favourite = async (nftid) => {
    alert(nftid)
    let toddlers = favNFT.filter((arrItem) => arrItem.nft_id == nftid);
    if (toddlers.length > 0) {remove_favorite(nftid, loggedUser)} 
    else { add_favourite(nftid, loggedUser)}
  };
  const remove_favorite = (nftid, userid) => {
    alert("remove")
    const favourite_payload = {
      user: userid,
      is_favorite: false,
      nft: nftid,
    };
    favouriteCall(favourite_payload);
  };
  const add_favourite = (nftid, userid) => {
    alert("add")

    const favourite_payload = {
      user: userid,
      is_favorite: true,
      nft: nftid,
    };
    favouriteCall(favourite_payload);
  };
  const favouriteCall = async (favourite_payload) => {
    const result = await favoriteNft.favoriteNftPost(`${ENV.API_URL}api/favourite-nft/`,favourite_payload);
    if (result.status == true) {
      alert(result.mssage)
      update_favourite();
    }
  };
  const update_favourite = async () => {
    const updatedfav = await favoriteNft.favoriteNftGet(`${ENV.API_URL}api/users-favourtie-nft/${loggedUser}/`);
    newArray = updatedfav.data.user_favourite_nft;
    setFavNFT(newArray);
  };
  return (
    <>
      <div className="row items">
          {nftData ? (
            nftData.map((item, id) => {
              return (
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

                          <button  onClick={() => check_favourite(item.nft_id, item.user_id)} className="set">
                            <i className="fas fa-heart fa-2x heart_color" />
                          </button>
                        </div>
                        <div className="seller d-flex align-items-center my-3 text-nowrap">
                          <span>Owned By</span>
                          <Link className="name_trim" to={`/author?${item.owner_id}`}>
                            <h6 className="ml-2 mb-0 ">{"@" + item.owner}</h6>
                          </Link>
                        </div>
                        <div className="card-bottom d-flex justify-content-between">
                          <span>{"$" + item.price}</span>
                          <span>{item.size}</span>
                        </div>
                        <Link className="btn btn-bordered-white btn-smaller mt-3" to="/wallet-connect" >
                          <i className="icon-handbag mr-2" />place a bid
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
    </>
  );
};
export default FavouriteNft;