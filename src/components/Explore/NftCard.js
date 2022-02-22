import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ENV } from "../../env";
import Heart from "../../assets/heart";
import FillHeart from "../../assets/fillHeart";
import jwt_decode from "jwt-decode";

const NftCard = ({ isFav, id, item, check_favourite, favNFT }) => {
  const token = JSON.parse(localStorage.getItem("access"));
  const [isFavorite, setIsFavorite] = useState(isFav);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("access"));
    token && setIsFavorite(isFav)
  }, [isFav]);
  return (
    <div className="col-12 col-sm-6 col-lg-3 item">
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
                  onClick={() => check_favourite(item.id, item.user_id)}
                  className="set"
                >
                  {isFavorite ? <FillHeart /> : <Heart />}
                </button>
              ) : (
                <Link to={"/login"}>
                  <Heart />
                </Link>
              )}
            </div>
            <div className="seller d-flex align-items-center my-3 text-nowrap">
              <span>Owned By</span>
              <Link className="name_trim" to={`/author?${item.user_id}`}>
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
              Place a bid
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
